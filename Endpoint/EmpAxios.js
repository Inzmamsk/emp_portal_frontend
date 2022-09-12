import axios from 'axios';
import Config from '../config/urls.json';

const AskAxios = axios.create({
  baseURL: Config.home
});


export default AskAxios;
