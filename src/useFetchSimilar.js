import { useReducer, useEffect } from 'react'
import axios from 'axios'

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, movies: [] }
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, movies: action.payload.movies }
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        movies: [],
      }
    default:
      return state
  }
}

export default function useFetchSimilar(movieId) {
  const API_KEY = '<YOUR_API_KEY>'
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
  const [state, dispatch] = useReducer(reducer, { movies: [], loading: true })

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST })
    axios
      .get(BASE_URL)
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { movies: res.data.results },
        })
      })
      .catch((e) => {
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
      })
  }, [BASE_URL])

  return state
}
