import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";

const Home = () => {
  
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        {/* {loading ? <h3>Loading...</h3> : <h3>All Products</h3>} */}
        <Jumbotron text={['Latest Products', 'Best Sellers']}/>
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals/>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers/>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList/>    
      <br/>
    </>
  );
};

export default Home;