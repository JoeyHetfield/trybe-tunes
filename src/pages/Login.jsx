import { Component } from 'react';

class Login extends Component {
  state = {
    isDisabled: true,
    user: '',
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

  render() {
    const { isDisabled, user } = this.state;
    return (
      <div data-testid="page-login">
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
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
