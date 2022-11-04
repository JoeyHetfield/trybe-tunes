import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isBtnDisabled: true,
    inputSearch: '',
  };

  handleSearch = (event) => {
    this.setState({
      inputSearch: event.target.value,
    }, () => {
      const { inputSearch } = this.state;
      const lengthUser = inputSearch.length;
      const maxLength = 2;
      this.setState({ isBtnDisabled: lengthUser < maxLength });
    });
  };

  render() {
    const { isBtnDisabled, inputSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            value={ inputSearch }
            onChange={ this.handleSearch }
          />
          <button
            disabled={ isBtnDisabled }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
