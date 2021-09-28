import React from 'react';
import {Card, Tabs} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/laptop.jpg';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';

const {TabPane} = Tabs;

//children component of Product Page.
const SingleProduct = ({product, onStarClick}) => {

  const {title, images, description, _id} = product;

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} className="mb-3 card-image"/>}
          >
          </Card>
        )}
        
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            If you need more information about this product, please call us to +34 666777888
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        
        <Card
          actions={[
            <>
            <ShoppingCartOutlined className="text-success"/>
            Add to Cart
            </>,
            <Link>
              <HeartOutlined className="text-info"/>
              <br/>
              Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating 
                name={_id}
                numberOfStars={5}
                rating={2}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="rgb(252, 215, 3)"
              />
            </RatingModal>
          ]}
        >
          
          <ProductListItems product={product}/>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;