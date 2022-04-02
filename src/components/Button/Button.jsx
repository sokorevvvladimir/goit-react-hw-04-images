import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ appState, onLoadMore, stateRenewer }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const { results, searchQuery } = appState;

    setResults(prevState => {
      return [...prevState, ...results];
    });
    setSearchQuery(searchQuery);
  }, []);

  useEffect(() => {
    stateRenewer(results);
  }, [results, searchQuery]);

  const onLoadMoreClick = () => {
    const { searchQuery } = appState;

    onLoadMore(searchQuery).then(response => {
      setResults(prevState => {
        return [...prevState, ...response.data.hits];
      });
      setSearchQuery(searchQuery);
    });
  };

  return (
    <button type="button" className={s.Button} onClick={onLoadMoreClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  appState: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  stateRenewer: PropTypes.func.isRequired,
};

export default Button;
