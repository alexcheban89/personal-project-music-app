import React, { useEffect, useState } from 'react';
// import Card from '../card';
// import './index.scss';

const Movies = ({ searchTerm, setSearchTerm }) => {
  const [similarArtists, setSimilarArtists] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    const fetchArtists = async (search) => {
      try {
        const similarArtistsFetch = await fetch(`http://localhost:8000/api/${search}`);
        setSimilarArtists(similarArtistsFetch);
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
    {/* <div className='cards'>
    {similarArtists.slice(0, 5).map((artist, key) => {
      return <Card key={key}
      name={artist.name} 
      images={(artist.images[2]).url} 
      genres={artist.genres}
      popularity={artist.popularity}
      />
    })}
    </div>
    <div className='cards-2'>
    {similarArtists.slice(5, 10).map((artist, key) => {
      return <Card key={key}
      name={artist.name} 
      images={(artist.images[2]).url} 
      genres={artist.genres}
      popularity={artist.popularity}
      />
    })}
    </div> */}
    </>
  );
};

export default Movies;