import { useState } from 'react'
import Header from './components/Header'
import Catalog from './components/Catalog'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
    <Header />
    <Routes>
    <Route path='/' element={<Catalog/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>

    </Routes>
    </>
  )
}

export default App
