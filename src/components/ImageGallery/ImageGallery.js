import { Component } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
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

const loaderRoot = document.querySelector('#loader-root');

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onImageClick: PropTypes.func.isRequired,
    showButton: PropTypes.func.isRequired,
  };

  state = {
    images: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, showButton } = this.props;

    if (prevProps.query !== query) {
      this.setState({ status: Status.PENDING });
      showButton(false);

      fetchImages(query, page)
        .then(images => {
          if (!images.length) {
            toast.info('No images found :(');
            this.setState({ images, status: Status.IDLE });
            return;
          }

          this.setState({ images, status: Status.RESOLVED }, showButton(true));
        })
        .catch(error => {
          toast.error(`${error.message}`, {
            theme: 'colored',
          });

          this.setState({ status: Status.REJECTED });
        });

      return;
    }

    if (prevProps.page !== page) {
      this.setState({ status: Status.PENDING });

      fetchImages(query, page)
        .then(images =>
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images],
              status: Status.RESOLVED,
            };
          }),
        )
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  getLargeImgURL = index => {
    this.props.onImageClick(this.state.images[index].largeImageURL);
  };

  render() {
    const { images, status } = this.state;

    return (
      <div>
        {status === 'pending' &&
          createPortal(
            <div className="loader">
              <Loader type="Grid" color="#3f51b5" height={100} width={100} />
            </div>,
            loaderRoot,
          )}

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
