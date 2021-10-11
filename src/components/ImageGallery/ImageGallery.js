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

    if (prevState.images) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  render() {
    console.log(this.props.onClick);
    return (
      <ul className="ImageGallery">
        {this.state.images &&
          this.state.images.map(({ largeImageURL, webformatURL, tags }) => {
            return (
              <div key={webformatURL}>
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  onClick={this.props.onClick}
                />
              </div>
            );
          })}
      </ul>
    );
  }
}

export default ImageGallery;
