import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {

    const { user } = useSelector((state) => ({...state}));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState(''); //Parent Category selected by the user

    //filtering 1º
    const [keyword, setKeyword] = useState("");

    //fetching all categories from database and rendering them on frontend:
    useEffect(()=>{
        loadCategories();
        loadSubs(); 
    }, []);

    //categories
    const loadCategories = () => {
        getCategories()
        .then((c) => setCategories(c.data));
    }

    //subcategories
    const loadSubs = () => {
        getSubs()
        .then((s) => setSubs(s.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name)
        setLoading(true);

        createSub({name:name, parent: category}, user.token)
        .then((res) => {
            //console.log(res);
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" was created`);
            loadSubs(); // fetch again the subcategories and show them on the page , so it is not neccesary to refresh the page to see the new subcategories added.
                   
        })
        .catch(err => {
            //console.log(err)
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        })
    }

    const handleRemove = async (slug) => {

            //preventing click by mistake
            if(window.confirm("Do you want to delete the Subcategory?")) {
                setLoading(true)
                removeSub(slug, user.token)
                .then((res) => {
                    //console.log(res);
                    setLoading(false);
                    toast.success(`"${res.data.subcategory_deleted.name}" was deleted`);
                    loadSubs(); // fetch again the subcategories and show them on the page , so it is not neccesary to refresh the page to see the subcategories without the one deleted. 
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
            }
    }
    
    //filtering 4º (use it before map categories)
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav></AdminNav>
            </div>
            <div className="col">
                {loading? <h4 className="text-danger">Loading...</h4> : <h4>Create Subcategory </h4>}
                
                <div className="form-group">
                    <label>Parent Category</label>
                    <select name="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                        <option disabled>Please Select</option>
                        {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                        
                    </select>
                </div>

                {/* 
                <div>
                    Category Id : {JSON.stringify(category)}
                </div>
                */}

                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}></CategoryForm>

                {/*Filtering, step 2 and 3, (refactored) */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword}></LocalSearch>


                
                {/*//filtering 5º Put searched function before "map"*/}
                {subs.filter(searched(keyword)).map((s) => (
                    <div className="alert alert-secondary" key={s._id}>
                        {s.name}
                        <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger"></DeleteOutlined></span>
                        <Link to={`/admin/sub/${s.slug}`}><span className="btn btn-sm float-right"><EditOutlined className="text-warning"></EditOutlined></span></Link>
                    </div>
                ))} 
                
            </div>
        </div>
    </div>
    );
};

export default SubCreate;