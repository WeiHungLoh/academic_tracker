import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import reportWebVitals from './reportWebVitals.js'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)

reportWebVitals()
