import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
//import { useParams } from 'react-router-dom'; //instead I'm going to use the 'match' prop 
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({history, match}) => {

    const { user } = useSelector((state) => ({...state}));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    //let { slug } = useParams();
    

    //fetching all categories from database and rendering them on frontend:
    useEffect(()=>{
        //console.log(slug)
        //console.log(match)
        loadCategory();
    }, []);

    const loadCategory = () => {
        getCategory(match.params.slug)
        .then((c)=> setName(c.data.name));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name)
        setLoading(true);
        updateCategory(match.params.slug, {name: name}, user.token)
        .then((res)=> {
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" was updated`);
            history.push('/admin/category');
        })
        .catch((err)=> {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        });
    }

/*
//refactored with the CategoryForm component
    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} autoFocus required></input>
                <br></br>
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>
    );
*/
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav></AdminNav>
            </div>
            <div className="col">
                {loading? <h4 className="text-danger">Loading...</h4> : <h4>Update Category </h4>}
                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}></CategoryForm>
                <hr></hr>
            </div>
        </div>
    </div>
    );
};

export default CategoryUpdate;