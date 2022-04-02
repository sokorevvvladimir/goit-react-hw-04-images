import s from './Loader.module.css';
import PropTypes from 'prop-types';
import { BallTriangle } from 'react-loader-spinner';

const Loader = ({ searchQuery }) => {
  return (
    <div className={s.Loader}>
      <BallTriangle
        height="200"
        width="200"
        color="#3f51b5"
        ariaLabel="loading"
      />
      <p className={s.Text}>Searching results for {searchQuery}</p>
    </div>
  );
};

Loader.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default Loader;
