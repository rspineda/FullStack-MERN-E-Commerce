import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';

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
    const [subOptions, setSubOptions] = useState([]); //subcategories once the parent category is selected
    const [showSub, setShowSub] = useState(false); //subcategories not visible until parent category is selected
    const [loading, setLoading] = useState(false);

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

    //When the user selects a category, the subcategories attached to that parent category will be fetch.
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('category clicked: ', e.target.value);
        setValues({...values, subs:[] ,category: e.target.value});
        getCategorySubs(e.target.value)
        .then((res) => {
            //console.log('subcategories attached to the category selected: ', res);
            setSubOptions(res.data);
        });
        setShowSub(true); //make visible the subcategories attached to the category selected
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

                    {JSON.stringify(values.images)}

                    <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues}
                            setLoading={setLoading}
                        ></FileUpload>
                    </div>

                    <ProductCreateForm 
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        values={values} 
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                    >
                    </ProductCreateForm>
                </div>
            </div>
        </div>
    )
};

export default ProductCreate;