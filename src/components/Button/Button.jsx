import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

class Button extends Component {
  state = { searchQuery: null, results: [] };

  onLoadMoreClick = () => {
    const { searchQuery } = this.props.appState;

    this.props.onLoadMore(this.state.searchQuery).then(response => {
      this.setState(prevState => {
        return {
          results: [...prevState.results, ...response.data.hits],
          searchQuery,
        };
      });
    });
  };

  componentDidMount() {
    const { results, searchQuery } = this.props.appState;

    this.setState(prevState => {
      return { results: [...prevState.results, ...results], searchQuery };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.results !== this.state.results) {
      this.props.stateRenewer(this.state.results);
      return;
    }
  }

  render() {
    return (
      <button type="button" className={s.Button} onClick={this.onLoadMoreClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  appState: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  stateRenewer: PropTypes.func.isRequired,
};

export default Button;
