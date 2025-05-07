import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '../src/store/store.js'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true; // 👈 Add this line

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter> {/* Only 1 Router at root level */}
        <App />
      </BrowserRouter>
  </Provider>
)