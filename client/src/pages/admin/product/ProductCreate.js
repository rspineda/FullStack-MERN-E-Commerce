import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import {  getCategories } from '../../../functions/category';

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Dell", "Asus", "Acer", "Lenovo", "Toshiba", "hp"],
    color: '',
    brand: ''
};

const ProductCreate = () => {

    const [values, setValues] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state}));

    //fetching all categories from database and rendering them on frontend:
    useEffect(()=>{
        loadCategories(); 
    }, []);

    const loadCategories = () => {
        getCategories()
        .then((c) => setValues({...values, categories: c.data}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
        .then(res => {
            console.log(res);
            window.alert(`"${res.data.title}" was created`);
            window.location.reload(); //once the iser click ok on the previous alert, the page'll reload and the form fields will be clear again.
        })
        .catch(err => {
            console.log(err);
            //if (err.response.status === 400) toast.error(err.response.data);
            toast.error(err.response.data.err);
        })
        
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        //console.log(e.target.name, "-----", e.target.value);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                    <h4>Create Product</h4>
                    <hr></hr>
                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values}></ProductCreateForm>
                </div>
            </div>
        </div>
    )
};

export default ProductCreate;