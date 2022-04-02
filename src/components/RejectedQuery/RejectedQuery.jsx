import PropTypes from 'prop-types';
import s from './RejectedQuery.module.css';

const RejectedQuery = ({ searchQuery }) => {
  return (
    <h1 className={s.RejectedQuery}>Nothing found by "{searchQuery}" query</h1>
  );
};

RejectedQuery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default RejectedQuery;
