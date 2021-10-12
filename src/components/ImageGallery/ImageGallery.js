import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'react-loader-spinner';
import fetchImages from '../../services/pixabay-api';
import './ImageGallery.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  };

  state = {
    images: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ status: Status.PENDING });

      setTimeout(() => {
        fetchImages(this.props.query, this.props.page).then(images =>
          this.setState({ images, status: 'resolved' }),
        );
      }, 1500);

      return;
    }

    if (prevProps.page !== this.props.page) {
      this.setState({ status: 'idle' });

      fetchImages(this.props.query, this.props.page).then(images =>
        this.setState(
          prevState => {
            return {
              images: [...prevState.images, ...images],
              status: 'resolved',
            };
          },
          () => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          },
        ),
      );
    }
  }

  getLargeImgURL = index => {
    console.log(index);
    console.log(this.state.images[index]);
    this.props.onImageClick(this.state.images[index].largeImageURL);
  };

  render() {
    const { images, status } = this.state;

    // if (status === 'pending') {
    //   return (
    //     <div className="loader">

    //     </div>
    //   );
    // }

    return (
      <div>
        <div className="loader">
          <Loader
            type="Grid"
            color="#3f51b5"
            height={100}
            width={100}
            visible={status === 'pending' ? true : false}
          />
        </div>
        <ul className="ImageGallery">
          {images &&
            images.map(({ webformatURL, tags }, index) => {
              return (
                <div key={index}>
                  <ImageGalleryItem
                    webformatURL={webformatURL}
                    tags={tags}
                    onClick={() => this.getLargeImgURL(index)}
                  />
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;
