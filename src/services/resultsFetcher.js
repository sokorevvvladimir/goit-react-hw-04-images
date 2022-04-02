import Axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24743165-5cd957bc5a8953f7a8bedce16';
let page = 1;
let searchQuery = null;

const fetchOnePage = inputValue => {
  if (searchQuery !== inputValue) {
    page = 1;
    searchQuery = inputValue;
    return Axios.get(
      `${BASE_URL}?q=${inputValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  }

  return Axios.get(
    `${BASE_URL}?q=${inputValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

const fetchData = inputValue => {
  const result = fetchOnePage(inputValue);
  page += 1;

  return result;
};

const api = { fetchData };

export default api;
