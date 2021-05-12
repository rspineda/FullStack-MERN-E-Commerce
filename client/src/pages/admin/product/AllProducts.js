import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import {useSelector} from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () => {

    const { user } = useSelector((state) => ({...state}));
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

    //remove product
    const handleRemove = (slug) => {
        let answer = window.confirm('Do you want to delete it?');
        if(answer) {
            console.log('send delete request', slug);
            removeProduct(slug, user.token)
            .then((res) => {
                //console.log(res.data);
                //console.log(res.data.product_deleted);
                loadAllProducts();
                toast.success(`"${res.data.product_deleted.title}" was deleted`);
            })
            .catch((err) => {
                console.log(err);
                if(err.response.status === 400) toast.error(err.response.data);
            });
        } 
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav></AdminNav>
            </div>
            <div className='col'>
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
                <div className='row'>
                    {products.map((product)=> (
                    <div key={product._id} className='col-md-4 pb-3'>
                        <AdminProductCard 
                            product={product} 
                            handleRemove={handleRemove}
                        />
                    </div>
                    ))}
                </div>
            </div>
            
        </div>
    </div>
    );
};

export default AllProducts;