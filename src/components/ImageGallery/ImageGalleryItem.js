import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

function ImageGalleryItem({ webformatURL, largeImageURL, tags, onClick }) {
  return (
    <li className="ImageGalleryItem" onClick={() => onClick(largeImageURL)}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
