import { useState, useEffect } from 'react';
import Places from './Places.jsx';

const places = localStorage.getItem();
export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const response = fetch('https://localhost:3000/places')
      .then((response) => {
        return response.json()
      })
      .then((resData) => {
        setAvailablePlaces(resaData.places)
      })
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
