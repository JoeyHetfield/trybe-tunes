import React from 'react';
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
    console.log(user);

    return (
      <header data-testid="header-component">
        { isLoad ? <Loading /> : (
          <p data-testid="header-user-name">
            {' '}
            { user.name }
            {' '}
          </p>
        )}
      </header>
    );
  }
}

export default Header;
