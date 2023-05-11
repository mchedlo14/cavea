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
import Layout from './components/Layout/Layout.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<App />} />
          {/* <Route path='/inventories' element={<TableCompo />}/> */}
          <Route path='/add' element={<FormComp />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  </React.StrictMode>,
)
