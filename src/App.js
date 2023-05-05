import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  componentDidMount() {
    console.log(this.params);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/trybe-tunes" component={ Login } />
        <Route path="/trybe-tunes/search" component={ Search } />
        <Route path="/trybe-tunes/album/:id" component={ Album } />
        <Route path="/trybe-tunes/favorites" component={ Favorites } />
        <Route path="/trybe-tunes/profile/edit" component={ ProfileEdit } />
        <Route path="/trybe-tunes/profile" component={ Profile } />
        <Route exact path="/trybe-tunes" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
