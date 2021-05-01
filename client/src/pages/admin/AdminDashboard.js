import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../functions/product';
import AdminProductCard from '../../components/cards/AdminProductCard';

const AdminDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(10)
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav></AdminNav>
            </div>
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
            <div className="col">{products.map((product)=> (<AdminProductCard product={product} key={product._id}/>))}</div>
        </div>
    </div>
    );
};

export default AdminDashboard;