import './ImageGalleryItem.css';

function ImageGalleryItem({ id, webformatURL, tags }) {
  return (
    <li key={id} className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;
