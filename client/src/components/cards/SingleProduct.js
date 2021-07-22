import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const {Meta} = Card;

const SingleProduct = ({product}) => {

  const {title, description, images, slug} = product;

  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
        </Carousel>
      </div>
      <div className="col-md-5">
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
            </Link>
          ]}
        >
          <Meta title={title} description={description}/>
          <p>
            price/category/subs/shipping/color/quantity available/sold..
          </p>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;