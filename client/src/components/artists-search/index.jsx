import React, { useEffect, useState } from 'react';
import Card from '../cards';
import './index.scss';

const Artists = ({ searchTerm, setSearchTerm }) => {
  const [similarArtists, setSimilarArtists] = useState([]);
  const [artist, setArtist] = useState([])
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  document.body.style.background = "white";
  document.body.style.opacity = "1";

  useEffect(() => {
    const fetchArtists = async (search) => {
      try {
        setIsLoading(true)
        setTimeout(async() => {
        const response = await fetch(`http://localhost:8000/api/${search}`);
        const artist = await response.json()
        setArtist(artist)
        setSimilarArtists(artist.similarArtists);
        setSearchTerm('')
        setIsLoading(false)
        }
        , 2000);
      } catch (err) {
        setHasErrored(true);
        setIsLoading(false);
        setSearchTerm('');
      }
    };

    if (searchTerm !== '') {
        fetchArtists(searchTerm);
    }
  }, [searchTerm, setSearchTerm]);

  if (similarArtists === undefined) {
    return <p className='alert'>WOOPS, SOMETHING WENT WRONG</p>;
  }

  if (hasErrored) {
    return <p className='alert'>ARE YOU SURE SERVER IS RUNNING?!</p>;
  }

  if (isLoading) {
    document.body.style.background = "rgba(0, 0, 0, 1)";
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
      <div className='artist-card'>
      <h2>{artist.name}</h2>
      <img className='card-image' src={artist.image} alt={artist.name} />
      </div>
      <h2 className='card-similar-artist'>SIMILAR ARTISTS</h2>
      <ul className='cards'>
      {similarArtists.map((artist, key) => {
      return <Card key={key}
      name={artist.name} 
      images={(artist.images[2]).url} 
      genres={artist.genres}
      popularity={artist.popularity}
      />
    })}
    </ul>
    </>
  );
};

export default Artists;