import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoad: false,
    check: false,
  };

  componentDidMount() {
    this.handleFavorites();
  }

  handleFavorites = async () => {
    const { trackId } = this.props;
    this.setState({
      isLoad: true,
    });
    const gotMusic = await getFavoriteSongs();
    if (gotMusic.some((umaMusica) => umaMusica.trackId === trackId)) {
      this.setState({
        check: true,
      });
    }

    this.setState({
      isLoad: false,
    });
  };

  checkedMusic = async () => {
    const { check } = this.state;
    const { musica } = this.props;
    if (!check) {
      this.setState({
        isLoad: true,
        check: true,
      });
      await addSong(musica);
      this.setState({
        isLoad: false,
      });
    } else {
      this.setState({
        isLoad: true,
      });
      await removeSong(musica);
      this.setState({
        isLoad: false,
        check: false,
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoad, check } = this.state;
    return (
      <div>
        { isLoad ? <Loading /> : (
          <div>
            <h1>{trackName}</h1>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `Music ${trackId}` }>
              Favorite
              <input
                type="checkbox"
                id={ `Music ${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.checkedMusic() }
                checked={ check }
              />
            </label>

          </div>
        )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
export default MusicCard;
