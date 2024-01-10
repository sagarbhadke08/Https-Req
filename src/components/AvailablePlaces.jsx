import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFeatching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);


  useEffect(() => {

    async function fetchPlaces() {
      setIsFetching(true);

      try {

        const places = await fetchAvailablePlaces();
        //? Moved the code from here to http.js file for better code structure and it is called the helper file

        navigator.geolocation.getCurrentPosition((position) => {

          const sortedPlaces = sortPlacesByDistance(
            // resData.places,
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, Please try again later.'
        });
      }


    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      loadingText='Featching places data'
      isLoading={isFeatching}
      onSelectPlace={onSelectPlace}
    />
  );
}
