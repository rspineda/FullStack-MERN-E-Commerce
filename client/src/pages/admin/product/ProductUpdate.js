import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {getProduct} from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons';


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

const ProductUpdate = ({match}) => {

    const {user} = useSelector((state) => ({ ...state}));
    const {slug} = match.params;
    const [values, setValues] = useState(initialState);

    useEffect(() => {
        loadProduct();
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


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    {JSON.stringify(values)}
                </div>
            </div>
        </div>
    )
};

export default ProductUpdate;