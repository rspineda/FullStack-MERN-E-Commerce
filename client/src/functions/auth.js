import axios from 'axios';

//sending client token to backend
export const createOrUpdateUser = async (authtoken) => {
    return await  axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken: authtoken
        }
    });
};

//sending to backend for getting current user info back
export const currentUser = async (authtoken) => {
    return await  axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
        headers: {
            authtoken: authtoken
        }
    });
};