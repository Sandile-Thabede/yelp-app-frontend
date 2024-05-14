import React from 'react'
import Header from '../elements/Header'
import AddRestaurant from '../elements/AddRestaurant'
import RestaurantsList from '../elements/RestaurantsList'

const Home = () => {
    return (
        <div>
            <Header/>
            <AddRestaurant/>
            <RestaurantsList/>
        </div>
    )
}

export default Home