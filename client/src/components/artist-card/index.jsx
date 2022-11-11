import React from 'react'
import './index.scss';

const ArtistCard = ({artist}) => {
    if (artist.length !== 0) {
        return <>
        <div className='artist-card'>
        <h2>{artist.name}</h2>
        <p><b>Info:  </b>{artist.description}</p>
        <img className='card-image' src={artist.image} alt={artist.name} />
        </div>
        <h2 className='card-similar-artist'>SIMILAR ARTISTS</h2>
        </>
    }
}

export default ArtistCard