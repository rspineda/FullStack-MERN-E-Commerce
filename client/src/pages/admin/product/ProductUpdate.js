import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {getProduct, updateProduct} from '../../../functions/product';
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
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); //to check if the category selected is the same that came from database
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);
    
    const loadProduct = () => {
        //1st. Loading the product
        getProduct(slug)
        .then((p) => {
            //console.log(p);
            setValues({...values, ...p.data});
            //2nd. Loading the subs that belong to that product.
            getCategorySubs(p.data.category._id)
            .then((res) => {
                setSubOptions(res.data); //Showing the subcategories when the user runs the page for the 1st time
            });
            //3rd. Preparing array of Ids, so it can be used on Select MUI component.
            let array = [];
            p.data.subs.map((s) => array.push(s._id));
            setArrayOfSubIds((prev) => array); //refreshed the previous values in the array with the new ones.
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
        setLoading(true);

    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        //console.log(e.target.name, "-----", e.target.value);
    }

    //When the user selects a category, the subcategories attached to that parent category will be fetch.
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('category clicked: ', e.target.value);
        setValues({...values, subs:[] });
        setSelectedCategory(e.target.value);
        getCategorySubs(e.target.value)
        .then((res) => {
            //console.log('subcategories attached to the category selected: ', res);
            setSubOptions(res.data);
        });
        //if user clicks different category and then clicks back to the original category:
        if(values.category._id === e.target.value){
            loadProduct();
        }
        setArrayOfSubIds([]); //cleaned the previus tags selected.
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-md-10">
                    {loading ? <LoadingOutlined className="text-danger h1"></LoadingOutlined> : (<h4>Create Update</h4>)}
                    <hr></hr>
                    {/* {JSON.stringify(values)} */}

                    <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues}
                            setLoading={setLoading}
                        ></FileUpload>
                    </div>

                    <ProductUpdateForm
                      handleSubmit={handleSubmit} 
                      handleChange={handleChange}
                      values={values} 
                      setValues={setValues}
                      categories={categories}
                      handleCategoryChange={handleCategoryChange}
                      subOptions={subOptions}
                      arrayOfSubIds={arrayOfSubIds}
                      setArrayOfSubIds={setArrayOfSubIds}
                      selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
};

export default ProductUpdate;