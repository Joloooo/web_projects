import { useState, useEffect } from "react";
import './Processing.css';

const Processing = () => {
    const [restaurantsDescr, setRestaurantsDescr] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5); 

    useEffect(() => {
        fetch('https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="restaurant"](48.1351,11.5820,48.1400,11.5900);out;')
            .then((res) => res.json())
            .then((data) => {
                setRestaurantsDescr(data.elements.map((element) => element.tags));
            })
            .catch((err) => console.error(`There was an error: ${err}`));
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    const formatLocation = (detail) => {
        const city = detail["addr:city"];
        const street = detail["addr:street"];
        const houseNumber = detail["addr:housenumber"];

        if (!city && !street && !houseNumber) return "N/A";
        return `${city || ""}${city && street ? ", " : ""}${street || ""}${street && houseNumber ? ", " : ""}${houseNumber || ""}`;
    };

    return (
        <div id="processingDiv">
            <h1>Restaurants in Munich</h1>
            {restaurantsDescr.slice(0, visibleCount).map((detail, index) => (
                <div id="restaurantDescrDiv" key={index}>
                    <p><span>Cuisine: </span>{detail.cuisine || "N/A"}</p>
                    <p><span>Name: </span>{detail.name || "N/A"}</p>
                    <p className="location"><span>Location: </span>{formatLocation(detail)}</p>
                    <p className="phone"><span>Phone: </span><a href={`tel:${detail.phone || "#"}`}>{detail.phone || "N/A"}</a></p>
                </div>
            ))}
            {visibleCount < restaurantsDescr.length && (
                <button onClick={handleShowMore} className="show-more">Show More</button>
            )}
        </div>
    );
};

export default Processing;
