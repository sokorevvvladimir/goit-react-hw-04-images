import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ result, onClick, modalSrcFetcher }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        src={result.webformatURL}
        alt={result.tags}
        className={s.ImageGalleryItemImage}
        onClick={modalSrcFetcher}
        srcSet={result.largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  result: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  modalSrcFetcher: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
