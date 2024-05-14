import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const Update = (props) => {
    //determines what restaurant we are trying to update by grabbing the id that we imbedded using history
    const { id } = useParams();

    //used history api to send us to this page, can use it to send us back after update
    let history = useNavigate()

    const { restaurants } = useContext(RestaurantContext)

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            //console.log(response.data.data.restaurant)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        };

        fetchData()
    }, []);

    const handleSave = async (e) => {
        e.preventDefault()

        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        } ) //id stored from useparams

        history("/");

        //console.log(updatedRestaurant);
    };

    return (
        <div>

            <form action="">

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id='name' className='form-control' type="number" />
                </div>

                <div>
                    <button type="submit" onClick={handleSave} className="btn btn-primary">Save</button>
                </div>

            </form>
        </div>
    )
}

export default Update