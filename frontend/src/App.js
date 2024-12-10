// frontend/src/App.js
import React, { useState } from 'react';
import Map from './components/Map';
import './App.css';
import './index.css';  // Update the relative path to the correct location.


const App = () => {
    const [savedLocation, setSavedLocation] = useState('');

    const handleLocationSave = (location) => {
        setSavedLocation(location);
    };

    return (
        <div className="App">
        
            <h1>Location/Address Flow</h1>
            <Map onLocationSave={handleLocationSave} />
            {savedLocation && <div>Saved Location: {savedLocation}</div>}
            
        </div>
    );
};

export default App;
