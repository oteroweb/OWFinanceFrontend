import axios from 'axios';
// local
//const server = "http://localhost:8001/";
// remote
const server = "https://owpage.website/owfinance/";

export default axios.create({
    baseURL: `${server}api/1.0/`
});