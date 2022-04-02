import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit, children }) => {
  const [inputValue, setInputValue] = useState('');

  const onInputHandler = e => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      toast.error('Fill in search line');
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmitHandler}>
        {children}

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={onInputHandler}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
