import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom ">
      <a href="/" className=" d-flex text-dark text-decoration-none">
        <span className="fs-4">Réservation de salle  </span>
      </a>

      {/* <ul className="nav nav-pills">
        <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Reserver</a></li>
        <li className="nav-item"><a href="" className="nav-link">Planning</a></li>
      </ul> */}
    </header>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
