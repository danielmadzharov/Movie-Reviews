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
import EditMovie from './components/edit-movie/EditMovie';
import RouteGuard from './components/route-guard/RouteGuard';
import GuestRouteGuard from './components/guest-route-guard/GuestRouteGuard';
function App() {
  return (
    <AuthContextProvider>
      <div id='box'>
        <Header />
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route element={<GuestRouteGuard />}> 
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/details/:movieId' element={<Details />} />
          <Route element={<RouteGuard />}> 
            <Route path='/edit/:movieId' element={<EditMovie />} />
            <Route path='/create' element={<CreateMovie />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route path='/search/' element={<SearchResults />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App
