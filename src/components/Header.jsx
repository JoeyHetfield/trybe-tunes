import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    isLoad: false,
  };

  componentDidMount() {
    this.handleHeader();
  }

  handleHeader = async () => {
    this.setState({ isLoad: true });
    const gotTheUser = await getUser();
    this.setState({
      isLoad: false,
      user: gotTheUser,
    });
  };

  render() {
    const { user, isLoad } = this.state;

    return (
      <header data-testid="header-component">
        { isLoad ? <Loading /> : (
          <div id="headerID">
            <p data-testid="header-user-name">
              {' '}
              { user.name }
              {' '}
            </p>
            <Link to="/search" data-testid="link-to-search">Procurar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
