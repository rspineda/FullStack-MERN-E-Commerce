import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({history, match}) => {

    const { user } = useSelector((state) => ({...state}));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [parent, setParent] = useState('');
    const [categories, setCategories] = useState([]);

    //fetching all categories from database and rendering them on frontend:
    useEffect(()=>{
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () => {
        getCategories()
        .then((c) => setCategories(c.data));
    };

    const loadSub = () => {
        getSub(match.params.slug)
        .then((s)=> {
            setName(s.data.name);
            setParent(s.data.parent);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name)
        setLoading(true);
        updateSub(match.params.slug, {name: name, parent: parent}, user.token)
        .then((res)=> {
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" was updated`);
            history.push('/admin/sub');
        })
        .catch((err)=> {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        });
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav></AdminNav>
            </div>
            <div className="col">
                
                {loading? <h4 className="text-danger">Loading...</h4> : <h4>Update Subcategory </h4>}
                
                <div className="form-group">
                    <label>Parent Category</label>
                    <select name="category" className="form-control" onChange={(e) => setParent(e.target.value)}>
                        <option>Please Select</option>
                        {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>))}             
                    </select>
                </div>

                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}></CategoryForm>
                
                <hr></hr>

            </div>
        </div>
    </div>
    );
};

export default SubUpdate;