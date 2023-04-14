// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    status: 'idle',
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({pokemon: null, status: 'pending', error: null})
    fetchPokemon(pokemonName).then(
      pokemonData => {
        console.log('success')
        setState({pokemon: pokemonData, status: 'resolved', error: null})
      },
      error => {
        console.log('reject')
        setState({pokemon: null, status: 'rejected', error: error})
      },
    )
  }, [pokemonName])

  if (state.status === 'rejected') {
    console.log('rejected')
    return (
      <div role="alert">
        There was an error:
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  } else if (state.status === 'idle') {
    console.log('idle')
    return 'Submit a pokemon'
  } else if (state.status === 'pending') {
    console.log('pending')
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    console.log('fallback')
    return <PokemonDataView pokemon={state.pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
