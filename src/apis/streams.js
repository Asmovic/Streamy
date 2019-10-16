import axios from 'axios';
import { PRODDB, LOCALDB } from '../api.json';

var url = '';
if (window.location.host.match === 'http://localhost:3000' || 'https://localhost:3000') {
    url = LOCALDB
} else {
    url = PRODDB 
}
export default axios.create({

    baseURL: url
    /* baseURL: 'https://streamy-db.herokuapp.com' */
})