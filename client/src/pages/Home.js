import React, {useEffect, useState} from "react";
import { getProductsByCount } from '../functions/product';
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";

const Home = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3)
    .then((res) => {
      setProducts(res.data);
      setLoading(false);
    })
  };

  return (
    <>
    <div className="jumbotron text-danger h1 font-weight-bold text-center">
      {/* {loading ? <h3>Loading...</h3> : <h3>All Products</h3>} */}
      <Jumbotron text={['Latest Products', 'Best Sellers']}/>
    </div>
    <div className="container">
      { loading ? (<LoadingCard/>) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard
                product={product}
              />
            </div>
          ))}
        </div>
        )
      }
    </div>
    </>
  );
};

export default Home;