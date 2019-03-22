import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Home from './pages/homePage';

const Routes = () => (
    <BrowserRouter>
        <Home/>
    </BrowserRouter>
);

export default Routes;