import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from './ProductListItems';

const SingleProduct = ({product}) => {

  const {title, images} = product;

  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
        </Carousel>
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
            </Link>
          ]}
        >
          
          <ProductListItems product={product}/>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;