import Header from './components/header/Header'
import Catalog from './components/catalog/Catalog'
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Details from './components/details/Details';
import SearchResults from './components/search/Search';
import { AuthContextProvider } from './contexts/authContext';
import Logout from './components/logout/Logout';
import CreateMovie from './components/create-movie/CreateMovie';
import NotFound from './components/404/404';

function App() {
  return (
    <AuthContextProvider>
    <div id='box'>
    <Header />
    <Routes>
    <Route path='/' element={<Catalog/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/details/:movieId' element={<Details/>}/>
    <Route path='/logout' element={<Logout />} />
    <Route path='/search/' element={<SearchResults/>}/>
    <Route path='/create' element={<CreateMovie/>}/>
    <Route path='*' element={<NotFound/>} />
    </Routes>
    </div>
    </AuthContextProvider>
  )
}

export default App
