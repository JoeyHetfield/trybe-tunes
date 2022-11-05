import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    isBtnDisabled: true,
    inputSearch: '',
    isLoad: false,
    searchedArtist: [],
    artistName: '',
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

  handleSearchButton = async () => {
    const { inputSearch } = this.state;
    this.setState({
      isLoad: true,
      artistName: inputSearch,
      inputSearch: '',
    });
    const Searched = await searchAlbumsAPI(inputSearch);
    this.setState({
      isLoad: false,
      searchedArtist: Searched,
    });
  };

  render() {
    const { isBtnDisabled, inputSearch, isLoad, searchedArtist, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoad ? <Loading /> : (
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
              onClick={ this.handleSearchButton }
            >
              Pesquisar

            </button>
          </form>
        )}
        {searchedArtist.length === 0
          ? <p>Nenhum álbum foi encontrado</p> : (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                { artistName }
              </p>
              <ul>
                {searchedArtist.map((album) => (
                  <li key={ album.collectionId }>
                    <h1>{album.artistName}</h1>
                    <h2>{album.collectionName}</h2>
                    <img src={ album.artworkUrl100 } alt="Capa do album" />
                    <h3>
                      Número de musicas:
                      {' '}
                      { album.trackCount }
                    </h3>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <p> Mais informações </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
