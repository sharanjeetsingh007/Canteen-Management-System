import React from 'react';
import { createStore } from 'redux';

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
    console.log(type);
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store;

const CountContext = React.createContext()
function useCount() {
    const context = React.useContext(CountContext)
    if (!context) {
        throw new Error(`useCount must be used within a CountProvider`)
    }
    return context
}

function CountProvider(props) {
    const [count, setCount] = React.useState(0)
    const value = React.useMemo(() => [count, setCount], [count])
    return <CountContext.Provider value={value} {...props} />
}

export {CountProvider, useCount}