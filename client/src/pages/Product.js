import React, {useState, useEffect} from 'react';
import {getProduct, productStar, getRelated} from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';
import { useSelector } from 'react-redux';

const Product = ({match}) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
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
      existingRatingObject && setStars(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug)
    .then((res) =>  {
      setProduct(res.data);
      getRelated(res.data._id)
      .then((res) => {
        console.log(res.data);
        setRelated(res.data);
      });
    });
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

      <div className="row pb-5">
        {related.length ? related.map((r) => (
          <div key={r._id} className="col-md-4" >
            <ProductCard 
              product={r}
            />
          </div>
        )) : (
          <div className="text-center col">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;