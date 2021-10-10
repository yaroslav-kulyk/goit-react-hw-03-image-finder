import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.css';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    res: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.query}&page=1&key=22978515-5cb8795ed8e9eafc86c022855&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(r => r.json())
        .then(res => this.setState({ res }));
    }
  }

  render() {
    return (
      <ul className="ImageGallery">
        {this.state.res &&
          this.state.res.hits.map(({ id, webformatURL, tags }) => {
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
