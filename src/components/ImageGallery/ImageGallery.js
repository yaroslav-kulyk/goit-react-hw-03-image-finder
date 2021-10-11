import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { fetchImages } from '../../services/pixabay-api';
import './ImageGallery.css';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  };

  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      fetchImages(this.props.query, this.props.page).then(images =>
        this.setState({ images }),
      );

      return;
    }

    if (prevProps.page !== this.props.page) {
      fetchImages(this.props.query, this.props.page).then(images =>
        this.setState(prevState => {
          return { images: [...prevState.images, ...images] };
        }),
      );
    }
  }

  render() {
    return (
      <ul className="ImageGallery">
        {this.state.images &&
          this.state.images.map(({ id, webformatURL, tags }) => {
            return (
              <div key={id}>
                <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
              </div>
            );
          })}
      </ul>
    );
  }
}

export default ImageGallery;
