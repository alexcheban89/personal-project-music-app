import React from 'react'
import './index.scss';

const Card = ({name, images, genres, popularity}) => {
  return (
        <li className='card'>
        <h3>Artist: {name}</h3>
        <img src={images} alt={name} />
        <p><b>Generes: </b><br></br>{genres.slice(0, 1).join(', ').toUpperCase()}</p>
        <p><b>Popularity: </b>{popularity}</p>
        </li>
  )
}

export default Card