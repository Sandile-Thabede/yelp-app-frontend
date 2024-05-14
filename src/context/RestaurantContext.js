import React, {useState, createContext} from "react"

export const RestaurantContext = createContext();

//contextProvider element used to wrap our entire application so that they all have access to our state
export const RestaurantContextProvider = props => {
    /* "restaurants" array that stores a list of all the restaurants we fetch from our back end server,
       "setRestaurants" is the function used to update this list on the array
       "useState" - default will be an empty array
    */
    const [restaurants, setRestaurants] = useState([])

    //function for adding a restuarant after clicking add button
    //pass in newly created restaurant
    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };
    return (
        /* storing restaurants but now we have to pass it down as an object in 'value'
            passing down setRestaurants as well so that the elements update our state
        */
        <RestaurantContext.Provider value = {{ restaurants, setRestaurants, addRestaurant }}>
            {/* pass in */}
            {props.children}
        </RestaurantContext.Provider>
    )
}