import React, {useState, useEffect} from 'react';
import {getProduct, productStar} from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';

const Product = ({match}) => {
  const [product, setProduct] = useState({});
  const [stars, setStars] = useState(0);
  const {slug} = match.params;
  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    //finding last user's rating so it can be shown on the modal if it wants to rate agin 
    if(product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => (ele.postedBy.toString() === user._id.toString())
      );
      console.log(existingRatingObject);
      existingRatingObject && setStars(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug)
    .then((res) => setProduct(res.data));
  };

  const onStarClick = (newRating, name) => {
    setStars(newRating);
    productStar(name, newRating, user.token )
    .then((res) => {
      loadSingleProduct(); //showing the new rating applied to the user
    })
  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct 
          product={product}
          onStarClick={onStarClick}
          stars={stars}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr/>
          <h4>Related Products</h4>
          <hr/>
        </div>
      </div>
    </div>
  );
};

export default Product;