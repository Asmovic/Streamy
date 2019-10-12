import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import Header from './Header';
import history from '../history';



const App = () => {
    return (
        <div className='ui container'>
            <Router history={history}>
                <div>
                    <Header />
                    <Route path='/' exact component={StreamList} />
                    <Route path='/stream/new' exact component={StreamCreate} />
                    <Route path='/stream/edit/:id' exact component={StreamEdit} />
                    <Route path='/stream/:id' exact component={StreamShow} />
                    <Route path='/stream/delete/:id' exact component={StreamDelete} />
                </div>
            </Router>
        </div>
    )
}

export default App;