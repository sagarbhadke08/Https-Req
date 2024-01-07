import { useState, useEffect } from 'react';
import Places from './Places.jsx';

// const places = localStorage.getItem();
export default function AvailablePlaces({ onSelectPlace }) {

  const [isFeatching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {

    async function fetchPlaces() {
      setIsFetching(true);
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      loadingText='Featching places data'
      isLoading={true}
      onSelectPlace={onSelectPlace}
    />
  );
}
