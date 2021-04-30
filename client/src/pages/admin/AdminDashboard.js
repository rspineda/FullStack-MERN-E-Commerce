import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../functions/product';

const AdminDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductsByCount(10)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav></AdminNav>
            </div>
            <div className="col">{JSON.stringify(products)}</div>
        </div>
    </div>
    );
};

export default AdminDashboard;