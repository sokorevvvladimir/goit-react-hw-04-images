import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import s from './App.module.css';
import Loader from './Loader';
import BeforeQuery from './BeforeQuery';
import RejectedQuery from './RejectedQuery';
import resultsFetcherAPI from '../services/resultsFetcher';
import Modal from './Modal';
import IconButton from './IconButton';
import { ReactComponent as SearchIcon } from '../icons/search-icon.svg';

class App extends Component {
  state = {
    searchQuery: null,
    results: [],
    status: 'idle',
    showModal: false,
    currentImageSrc: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending' });

      resultsFetcherAPI.fetchData(nextSearchQuery).then(response => {
        this.setState(prevState => {
          return {
            results: [...prevState.results, ...response.data.hits],
            status: 'resolved',
          };
        });
        if (response.data.hits.length === 0) {
          this.setState({ status: 'rejected' });
        }
      });
    }
  }

  onFormSubmit = newSearchQuery => {
    if (newSearchQuery === this.state.searchQuery) {
      toast.error(`"${newSearchQuery}" results are already here!`);
      return;
    }
    this.setState({ searchQuery: newSearchQuery, results: [] });
  };

  onLoadMoreClick = data => {
    this.setState({ results: [...data] });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  modalSrcFetcher = e => {
    this.setState({ currentImageSrc: e.target.attributes.srcSet.value });
  };

  render() {
    const { searchQuery, results, status, showModal, currentImageSrc } =
      this.state;

    if (showModal) {
      const bodyRef = document.querySelector('body');
      bodyRef.classList.add('.modal-open');
    }

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onFormSubmit}>
          <IconButton aria-label="start search">
            <SearchIcon width="20" height="20" />
          </IconButton>
        </Searchbar>
        {showModal && (
          <Modal onClose={this.toggleModal} currentImageSrc={currentImageSrc} />
        )}
        {status === 'idle' && <BeforeQuery />}
        {status === 'pending' && <Loader searchQuery={searchQuery} />}
        {status === 'rejected' && <RejectedQuery searchQuery={searchQuery} />}
        {status === 'resolved' && (
          <>
            <ImageGallery>
              {results.map(result => {
                return (
                  <ImageGalleryItem
                    key={result.id}
                    result={result}
                    onClick={this.toggleModal}
                    modalSrcFetcher={this.modalSrcFetcher}
                  />
                );
              })}
            </ImageGallery>
            <Button
              appState={this.state}
              onLoadMore={resultsFetcherAPI.fetchData}
              stateRenewer={this.onLoadMoreClick}
            />
          </>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
