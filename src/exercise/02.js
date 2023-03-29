// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState() {
  const [name, setName] = React.useState(() => {
    let storedName = window.localStorage.getItem('name')
    let nameToUse = storedName ? storedName : ''
    console.log(nameToUse)
    return nameToUse
  })

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  return [name, setName]
}

function Greeting() {
  const [name, setName] = useLocalStorageState()

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
