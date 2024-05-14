import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./routes/Home";
import RestaurantDetail from "./routes/RestaurantDetail";
import UpdateRestaurant from "./routes/UpdateRestaurant";
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () => {
    return (
        //wrap entire app element with our context API
        <RestaurantContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route exact path = "/" element = {<Home/>} />
                        <Route exact path = "/restaurants/:id" element = {<RestaurantDetail/>} />
                        <Route exact path = "/restaurants/:id/update" element = {<UpdateRestaurant/>} />
                    </Routes>
                </Router>    
            </div>
        </RestaurantContextProvider>
    )
}

export default App;