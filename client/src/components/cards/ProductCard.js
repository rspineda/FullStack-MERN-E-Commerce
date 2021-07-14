import React from 'react';
import {Card} from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptopImage from '../../images/laptop.jpg';
import {Link} from 'react-router-dom';


const {Meta} = Card;

const ProductCard = ({product}) => {

  const {images, title, description, slug} = product;

  return (
      <Card
        cover={
            <img 
                src={images && images.length ? images[0].url : laptopImage} 
                style={{height:'150px', objectFit:'cover'}}
                className='p-1'
            />}
        actions={[
          <Link to={`product/${slug}`}>
              <EyeOutlined className="text-warning"/>
              <br/>
              View Product
          </Link>, 
          <>
            <ShoppingCartOutlined 
                className="text-warning" 
            />
            <br/>
            Add to Cart
          </>,
        
        ]}
      >
        <Meta 
          title={title} 
          description={`${description && description.substring(0,40)}...`}
        />
      </Card>
  )
};

export default ProductCard;