import React from 'react';
import {Card} from 'antd';
import laptopImage from '../../images/laptop.jpg';

const {Meta} = Card;

const AdminProductCard = ({product}) => {

    const {title, description, images} = product;

    return  (<Card 
                cover={
                    <img 
                        src={images && images.length ? images[0].url : laptopImage} 
                        style={{height:'150px', objectFit:'cover'}}
                        className='p-1'
                    />}
             >
                <Meta title={title} description={description}></Meta>
             </Card>)
};

export default AdminProductCard;