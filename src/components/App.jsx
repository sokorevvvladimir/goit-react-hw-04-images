import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import s from './App.module.css';
import Loader from './Loader';
import BeforeQuery from './BeforeQuery';
import RejectedQuery from './RejectedQuery';
import resultsFetcherAPI from '../services/resultsFetcher';
import Modal from './Modal';
import IconButton from './IconButton';
import { ReactComponent as SearchIcon } from '../icons/search-icon.svg';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState('');

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }

    setStatus('pending');

    resultsFetcherAPI.fetchData(searchQuery).then(response => {
      setResults(prevState => {
        return [...prevState, ...response.data.hits];
      });
      setStatus('resolved');

      if (response.data.hits.length === 0) {
        setStatus('rejected');
      }
    });
  }, [searchQuery]);

  const onFormSubmit = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      toast.error(`"${newSearchQuery}" results are already here!`);
      return;
    }
    setSearchQuery(newSearchQuery);
    setResults([]);
  };

  const onLoadMoreClick = data => {
    setResults([...data]);
  };

  const toggleModal = () => {
    setShowModal(prevState => {
      return !prevState;
    });
  };

  const modalSrcFetcher = e => {
    setCurrentImageSrc(e.target.attributes.srcSet.value);
  };

  if (showModal) {
    const bodyRef = document.querySelector('body');
    bodyRef.classList.add('.modal-open');
  }

  const state = { results, searchQuery };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onFormSubmit}>
        <IconButton aria-label="start search">
          <SearchIcon width="20" height="20" />
        </IconButton>
      </Searchbar>
      {showModal && (
        <Modal onClose={toggleModal} currentImageSrc={currentImageSrc} />
      )}
      {status === 'idle' && <BeforeQuery />}
      {status === 'pending' && <Loader searchQuery={searchQuery} />}
      {status === 'rejected' && <RejectedQuery searchQuery={searchQuery} />}
      {status === 'resolved' && (
        <>
          <ImageGallery
            results={results}
            toggleModal={toggleModal}
            modalSrcFetcher={modalSrcFetcher}
          />
          <Button
            appState={state}
            onLoadMore={resultsFetcherAPI.fetchData}
            stateRenewer={onLoadMoreClick}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
