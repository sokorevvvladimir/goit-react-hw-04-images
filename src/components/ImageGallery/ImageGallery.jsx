import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ results, toggleModal, modalSrcFetcher }) => {
  return (
    <ul className={s.ImageGallery}>
      {results.map(result => {
        return (
          <ImageGalleryItem
            key={result.id}
            result={result}
            onClick={toggleModal}
            modalSrcFetcher={modalSrcFetcher}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape),
  toggleModal: PropTypes.func.isRequired,
  modalSrcFetcher: PropTypes.func.isRequired,
};

export default ImageGallery;
