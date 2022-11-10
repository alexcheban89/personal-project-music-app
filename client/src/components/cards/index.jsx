import React from 'react'
import './index.scss';

const Card = ({ searchTerm, setSearchTerm, name, images, genres, popularity}) => {
  const newSearchHandler = (e) => {
    if (e.target) {
      return setSearchTerm(name)
    }
  }
  return (
        <li className='card' onClick={newSearchHandler}>
        <h3>{name}</h3>
        <img src={images} alt={name} />
        <p><b>Generes: </b><br></br>{genres.slice(0, 1).join(', ').toUpperCase()}</p>
        <p><b>Popularity: </b>{popularity}</p>
        </li>
  )
}

export default Card