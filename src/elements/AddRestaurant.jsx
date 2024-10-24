import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'

const AddRestaurant = () => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("price range")

    const {addRestaurant} = useContext(RestaurantContext);

    const handleAdd = async (e) => {
        //prevents page from reloading so that we don't lose our state
        // e.preventDefault()
        try {
            const response = await RestaurantFinder.post("/", {
                name: name,
                location,
                price_range: priceRange
            })

            addRestaurant(response.data.data.restaurant)

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name' />
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='location' />
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select my-0 mr-sm-2" >
                            <option disabled>price range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col d-grid">
                        <button onClick={handleAdd} type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant