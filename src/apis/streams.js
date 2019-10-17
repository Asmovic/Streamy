import axios from 'axios';
import { PRODDB, LOCALDB } from '../api.json';

var url = '';
if (window.location.host.match(/localhost/)) {
    console.log('match...', window.location.host)
    url = LOCALDB
} else {
    url = PRODDB
}
export default axios.create({

    baseURL: url
    /* baseURL: 'https://streamy-db.herokuapp.com' */
})