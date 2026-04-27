import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import App2 from './App2.jsx'
import Lazyinit from './lazyinit.jsx'
import UseArray from './UseArray.jsx'
import UseReducer from './UseReducer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UseReducer/>
  </StrictMode>
)
