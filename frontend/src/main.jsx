import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Form,
} from "react-router-dom";
import TableCompo from './components/TableCompo.jsx';
import FormComp from './pages/FormComp.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/inventories' element={<TableCompo />}/>
      <Route path='/add' element={<FormComp />}/>
    </Routes> 
    </BrowserRouter>

  </React.StrictMode>,
)
