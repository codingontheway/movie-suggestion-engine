import React from 'react'
import { Card } from 'react-bootstrap'

export const MovieCard = ({ movie }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant='top'
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
      />
      <Card.Body>
        <Card.Title className='text-center font-weight-bold'>
          {movie.title}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}
