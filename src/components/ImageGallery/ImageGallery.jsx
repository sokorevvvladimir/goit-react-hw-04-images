import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={s.ImageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape),
};

export default ImageGallery;
