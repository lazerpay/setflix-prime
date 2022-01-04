import Home from './Components/Home/Home';
import UserHome from './Components/User Home/UserHome';
import VideoPage from './Components/Video Page/VideoPage';
import Signup from './Components/Sign Up/Signup';
import Login from './Components/Sign Up/Login';
import AllMovies from './Components/DisplayAll Pages/AllMovies';
import GenreParent from './Components/Sign Up/GenreParent';
import AllGenre from './Components/DisplayAll Pages/AllGenre';
import AllTrending from './Components/DisplayAll Pages/AllTrending';
import AllTheatre from './Components/DisplayAll Pages/AllTheatre';
import AllTvShows from './Components/DisplayAll Pages/AllTvShows';
import AllFavs from './Components/DisplayAll Pages/AllFavs';
import Account from './Components/Account/Account';
import SearchPage from './Components/Search/SearchPage';
import ErrorIndex from './Components/404';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider';
import PrivateHomeRoute from './Private/PrivateHomeRoute';
import PrivateLoginRoute from './Private/PrivateLoginRoute';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <PrivateHomeRoute path="/" exact component={Home}></PrivateHomeRoute>

            <PrivateLoginRoute path="/user" exact component={UserHome}></PrivateLoginRoute>

            <PrivateLoginRoute path="/movie/watch/:movieID" exact component={VideoPage}></PrivateLoginRoute>

            <Route path="/signup" exact component={Signup}></Route>

            <Route path="/login" exact component={Login}></Route>

            <PrivateLoginRoute path="/choice" exact component={GenreParent}></PrivateLoginRoute>

            <PrivateLoginRoute path="/movies/all" exact component={AllMovies}></PrivateLoginRoute>
            
            <PrivateLoginRoute path="/movies/all/:genreID" exact component={AllGenre}></PrivateLoginRoute>

            <PrivateLoginRoute path="/trending" exact component={AllTrending}></PrivateLoginRoute>

            <PrivateLoginRoute path="/theatre" exact component={AllTheatre}></PrivateLoginRoute>

            <PrivateLoginRoute path="/tv" exact component={AllTvShows}></PrivateLoginRoute>

            <PrivateLoginRoute path="/account" exact component={Account}></PrivateLoginRoute>

            <PrivateLoginRoute path="/user/favs" exact component={AllFavs}></PrivateLoginRoute>

            <PrivateLoginRoute path="/search" exact component={SearchPage}></PrivateLoginRoute>

            <Route component={ErrorIndex}></Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;