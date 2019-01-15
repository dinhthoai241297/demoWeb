import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    {routes}
                </Router>
                <ToastContainer />
            </Fragment>
        );
    }
}

export default App;
