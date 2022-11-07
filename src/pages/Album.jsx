import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      music: [],
      nameArtist: '',
      album: '',
      image: '',
      isLoad: false,
    };
  }

  componentDidMount() {
    this.handleMusics();
  }

  handleMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      music: response,
      nameArtist: response[0].artistName,
      album: response[0].collectionName,
      image: response[0].artworkUrl100,
    });
  };

  render() {
    const { music, nameArtist, album, image, isLoad } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoad ? <Loading /> : (
          <div>
            <h1 data-testid="artist-name">
              { nameArtist }
            </h1>
            <h2 data-testid="album-name">
              { album }
            </h2>
            <img src={ image } alt="capa do album" />
            <div>
              {music.slice(1).map((musica) => (
                <div key={ musica.trackId }>
                  <MusicCard
                    trackName={ musica.trackName }
                    previewUrl={ musica.previewUrl }
                    trackId={ musica.trackId }
                    musica={ musica }
                  />
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
