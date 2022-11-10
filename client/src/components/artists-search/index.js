import React, { useEffect, useState } from 'react';
// import Card from '../card';
import './index.scss';

const Artists = ({ searchTerm, setSearchTerm }) => {
  const [similarArtists, setSimilarArtists] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    const fetchArtists = async (search) => {
      try {
        setIsLoading(true)
        setTimeout(async() => {
        const response = await fetch(`http://localhost:8000/api/${search}`);
        const artist = await response.json()
        setSimilarArtists(artist);
        setSearchTerm('')
        setIsLoading(false)
        }
        , 2000);
      } catch (err) {
        setHasErrored(true);
        setIsLoading(false);
      }
    };

    if (searchTerm !== '') {
        fetchArtists(searchTerm);
    }
  }, [searchTerm, setSearchTerm]);

  if (similarArtists === 'WOOPS') {
    return <p>WOOPS, SOMETHING WENT WRONG</p>;
  }

  if (hasErrored) {
    return <p>ARE YOU SURE SERVER IS RUNNING?!</p>;
  }

  if (isLoading) {
    return <>
    <div className="container">
    <div className="everlib-logo">
    <i className="everlib-logo-first-bar"></i>
    <i className="everlib-logo-second-bar"></i>
    <i className="everlib-logo-third-bar"></i>
    <i className="everlib-logo-fourth-bar"></i>
    </div>
    </div>
    </>;
  }

  return (
    <>
    </>
  );
};

export default Artists;