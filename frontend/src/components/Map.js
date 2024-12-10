// frontend/src/components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Map = ({ onLocationSave }) => {
    const mapRef = useRef(null);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

        const input = document.getElementById('search-input');
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const location = place.geometry.location;
                setCoordinates({
                    lat: location.lat(),
                    lng: location.lng(),
                });
                setAddress(place.formatted_address);
            }
        });
    }, []);

    const handleSaveLocation = () => {
        if (address && coordinates) {
            axios
                .post('http://localhost:5001/save-location', { address, coordinates })
                .then((response) => {
                    alert('Location saved successfully!');
                    onLocationSave(address);
                })
                .catch((error) => {
                    console.error('Error saving location:', error);
                    alert('Error saving location');
                });
        }
    };

    return (
        <div>
            <input id="search-input" type="text" placeholder="Search location" />
            <div
                ref={mapRef}
                style={{ height: '400px', width: '100%' }}
            ></div>
            <button onClick={handleSaveLocation}>Save Location</button>
            {address && <div>Address: {address}</div>}
        </div>
    );
};

export default Map;
