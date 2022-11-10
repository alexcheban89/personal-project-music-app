import React, { useEffect, useState } from 'react';
// import Card from '../card';
// import './index.scss';

const Artists = ({ searchTerm, setSearchTerm }) => {
  const [similarArtists, setSimilarArtists] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    const fetchArtists = async (search) => {
      try {
        const similarArtistsFetch = await fetch(`http://localhost:8000/api/${search}`);
        const artist = await similarArtistsFetch.json()
        setSimilarArtists(artist);
        setSearchTerm('')
        setIsLoading(false)
      } catch (err) {
        setHasErrored(true);
        setIsLoading(false);
      }
    };

    if (searchTerm !== '') {
        fetchArtists(searchTerm);
    }
  }, [searchTerm]);

  if (hasErrored) {
    return <p>Error: Could not load movies!</p>;
  }

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <>
    </>
  );
};

export default Artists;