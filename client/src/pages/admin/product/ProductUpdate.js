import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {getProduct} from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';


const initialState = {
  title: '',
  description: '',
  price: '',
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

const ProductUpdate = ({match}) => {

    const {user} = useSelector((state) => ({ ...state}));
    const {slug} = match.params;
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]); //subcategories once the parent category is selected


    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);
    
    const loadProduct = () => {
        getProduct(slug)
        .then((p) => {
            //console.log(p);
            setValues({...values, ...p.data})
        })
        .catch((e) => {
            console.log(e);
        })
    };

    const loadCategories = () => {
        getCategories()
        .then((c) => setCategories(c.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
        //setShowSub(true); //make visible the subcategories attached to the category selected
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    {JSON.stringify(values)}
                    <ProductUpdateForm
                      handleSubmit={handleSubmit} 
                      handleChange={handleChange}
                      values={values} 
                      setValues={setValues}
                      categories={categories}
                      handleCategoryChange={handleCategoryChange}
                      subOptions={subOptions}
                    />
                </div>
            </div>
        </div>
    )
};

export default ProductUpdate;