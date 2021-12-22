import axios from 'axios'
import url from './baseURL'
import {AsyncStorage} from "react-native";


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: url
});

(async() => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    } else {
        instance.defaults.headers.common['Authorization'] = null;
    }
})();


export default instance;


