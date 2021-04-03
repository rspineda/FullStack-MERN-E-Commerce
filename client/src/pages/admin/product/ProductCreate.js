import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';

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

    //destructuring so later i dont have to use--> values.title .....
    const { title, description, price, categories, category, subs, shipping, quantity, images, colors, color, brands, brand } = values;
    
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
            if (err.response.status === 400) toast.error(err.response.data);
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" className="form-control" value={title} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" className="form-control" value={description} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" name="price" className="form-control" value={price} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Shipping</label>
                            <select name="shipping" className="form-control" onChange={handleChange}>
                                <option>Please select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <select name="color" className="form-control" onChange={handleChange}>
                                <option>Please select</option>
                                {colors.map((c)=> (<option key={c} value={c}>{c}</option>))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <select name="brand" className="form-control" onChange={handleChange}>
                                <option>Please select</option>
                                {brands.map((b)=> (<option key={b} value={b}>{b}</option>))}
                            </select>
                        </div>
                        <button className="btn btn-outline-info">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ProductCreate;