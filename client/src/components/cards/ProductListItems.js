import React from 'react';
import {Link} from 'react-router-dom';

const ProductListItems = ({product}) => {

  const {price, category} = product;

  return (
    <ul className='list-group'>
        <li className='list-group-item'>
          Price<span className='label label-default label-pill pull-xs-right'>$ {price}</span>
        </li>
        {category && (
          <li className='list-group-item'>
          Category<Link to={`/category/${category.slug}`} className='label label-default label-pill pull-xs-right'>$ {category.name}</Link>
          </li>
        )}
        <li className='list-group-item'>
          Price<span className='label label-default label-pill pull-xs-right'>$ {price}</span>
        </li>
        <li className='list-group-item'>
          Price<span className='label label-default label-pill pull-xs-right'>$ {price}</span>
        </li>
        <li className='list-group-item'>
          Price<span className='label label-default label-pill pull-xs-right'>$ {price}</span>
        </li>
        <li className='list-group-item'>
          Price<span className='label label-default label-pill pull-xs-right'>$ {price}</span>
        </li>
        <li className='list-group-item'>
          Price<span className='label label-default label-pill pull-xs-right'>$ {price}</span>
        </li>
    </ul>
  );
};

export default ProductListItems;