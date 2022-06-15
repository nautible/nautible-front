import axios from 'axios'
import AuthService from "./AuthService"

const configure = () => {
  axios.interceptors.request.use((config) => {
    if(AuthService.getToken() != null){
      const cb = () => {
        // add token to http header 
        config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
        config.baseURL = process.env.REACT_APP_URL_PREFIX
        return Promise.resolve(config);
      }
      // update token if token is expired.
      return AuthService.updateToken(cb);
    }
    config.baseURL = process.env.REACT_APP_URL_PREFIX
    return Promise.resolve(config);
  }); 
};

const HttpServiceConfigurator = {
  configure,
};

export default HttpServiceConfigurator;