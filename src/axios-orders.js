import axios from 'axios';

// Setting up of axios instance

// Setting an instance with axios base url
const instance = axios.create({
    baseURL: 'https://react-burger-builder-2437f-default-rtdb.firebaseio.com/'
});

export default instance;
