import Header from './components/header/Header'
import Catalog from './components/catalog/Catalog'
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Details from './components/details/Details';
import SearchResults from './components/search/Search';

function App() {
  return (
    <>
    <Header />
    <Routes>
    <Route path='/' element={<Catalog/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/details/:movieId' element={<Details/>}/>
    <Route path='/search/' element={<SearchResults/>}/>
    </Routes>
    </>
  )
}

export default App
