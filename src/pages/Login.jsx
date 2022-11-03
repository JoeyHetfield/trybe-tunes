import { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    isDisabled: true,
    user: '',
    isLoad: false,
  };

  handleChangeUser = (event) => {
    this.setState({
      user: event.target.value,
    }, () => {
      const { user } = this.state;
      const lengthUser = user.length;
      const maxLength = 3;
      this.setState({ isDisabled: lengthUser < maxLength });
    });
  };

  handleCLick = () => {
    const { user } = this.state;
    this.setState({
      isLoad: true,
    });
    createUser({ name: user });
  };

  render() {
    const { isDisabled, user, isLoad } = this.state;
    return (
      <div data-testid="page-login">
        { isLoad ? <Loading /> : (
          <form>
            <label htmlFor="inputName">
              Usuario:
              <input
                type="text"
                value={ user }
                name="inputName"
                onChange={ this.handleChangeUser }
                data-testid="login-name-input"
              />
            </label>
            <button
              disabled={ isDisabled }
              type="button"
              data-testid="login-submit-button"
              onClick={ this.handleCLick }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
