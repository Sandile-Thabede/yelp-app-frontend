import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';

const RestaurantsList = (props) => {

    //import use context
    const { restaurants, setRestaurants } = useContext(RestaurantContext)

    //keep restuarant information using history api in react router, use on of the hooks that come with the react-router-Dom library
    let history = useNavigate()
    // history object will represent history of our browser


    useEffect(() => {
        (async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);

            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);

            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (id) => {
        try {
            history(`/restaurants/${id}/update`);
        } catch (err) {
            console.log(err);
        }
    }

    //pass in empty dependancy array abbove on 'useEffect' so the 'useEffect' function or hook only run when the element mounts and not ever again
    //if not passed in it will run when the element mounts and will also run everytime the element re-renders which might lead to a loop
    return (
        <div>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Restaurant</th>
                            <th scope="col">Location</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Ratings</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    {/* if restuarants exists and we have succeffuly fetched the data then run the code, if not, do not run the code */}
                    <tbody>
                        
                        {restaurants &&
                         restaurants.map((restaurant) => {
                            return (
                                <tr key={restaurant.id}>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{"$".repeat(restaurant.price_range)}</td>
                                    <td>reviews</td>
                                    <td>
                                        <button onClick={() => handleUpdate(restaurant.id)} className="button btn btn-warning">Edit</button>
                                    </td>
                                    <td>
                                        {/* this is how you pass argument into the function using the arrow because we don't want to run the 
                                        function rightaway we want to run it once the button is clicked
                                        pass in reference to funtion and not function itself*/}
                                        <button onClick={() => handleDelete(restaurant.id)} className="button btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            );

                        })}
                    </tbody>

                    {/* <tbody>
                        <tr>
                            <td>Mcdonald's</td>
                            <td>Braam</td>
                            <td>$$</td>
                            <td>Rating</td>
                            <td><div className="button btn btn-warning">Edit</div></td>
                            <td><div className="button btn btn-danger">Delete</div></td>
                        </tr>
                    </tbody> */}
                </table>
            </div>
        </div>
    )
}

export default RestaurantsList