import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)

reportWebVitals()
