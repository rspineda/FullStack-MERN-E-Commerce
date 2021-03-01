import axios from 'axios';

//get all categories
export const getCategories= async () => {
    return await  axios.post(`${process.env.REACT_APP_API}/categories`);
};