import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoad: false,
    check: false,
  };

  checkedMusic = async () => {
    this.setState({
      isLoad: true,
      check: true,
    });
    await addSong();
    this.setState({
      isLoad: false,
    });
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
            <label htmlFor="FavSong">
              Favorite
              <input
                type="checkbox"
                id="FavSong"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.checkedMusic }
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
};
export default MusicCard;
