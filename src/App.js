import React, { useState, useEffect } from 'react'
import useFetchSimilar from './useFetchSimilar'
import axios from 'axios'
import logo from './logo.svg'
import { Container, Form, Button } from 'react-bootstrap'
import { MovieCard } from './movieCard'

function App() {
  const [movieName, setMovieName] = useState('')
  const [movieId, setMovieId] = useState('')
  const [idError, setIdError] = useState(false)

  const API_KEY = 'YOUS_API_KEY'
  const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`
  const onFormSubmit = (e) => {
    e.preventDefault()
    axios
      .get(BASE_URL)
      .then((res) => setMovieId(res.data.results[0].id))
      .catch((e) => setIdError(true))
    setMovieName('')
    setIdError(false)
  }

  const { movies, loading, error } = useFetchSimilar(movieId)

  return (
    <>
      <Container>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h1 className='mt-4'>The movie suggestion engine</h1>
          <h2 className='mt-2'>pwered by</h2>
          <h3>
            <img src={logo} alt='logo' width='100px' className='mt-4' />
          </h3>
        </div>
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId='movie'>
            <Form.Control
              type='text'
              placeholder='Enter a movie name'
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
            <Form.Text className='text-muted'>
              We'll give you suggestions for similar movies
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
      {idError ? (
        <h1 className='text-center'>Please enter a valid movie name</h1>
      ) : (
        <Container fluid>
          {loading && <h1 className='text-center'>Loading...</h1>}
          <div className='row'>
            {movies.map((movie) => {
              return (
                <div className='col-md-2 mt-4 d-flex align-items-stretch'>
                  <MovieCard key={movie.id} movie={movie} />
                </div>
              )
            })}
          </div>
        </Container>
      )}
    </>
  )
}

export default App
