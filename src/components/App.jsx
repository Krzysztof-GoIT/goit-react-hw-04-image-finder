import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { getAPI } from '../pixabay-api';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (search === '') return;

    (async () => {
      await fetchImages(search, page);
    })();

    return () => {};
  }, [search, page]);

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);
      const fetchedImages = await getAPI(search, page);

      const { hits, totalHits } = fetchedImages;

      console.log(hits, totalHits);
      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. please try again.'
        );
        return;
      }
      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }
      if (page * 12 >= totalHits) {
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.", {});
      }
      setImages(prevState => [...prevState, ...hits]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="main-wrapper">
      <SearchBar onSubmit={handleSubmit} />

      {images.length >= 1 && <ImageGallery photos={images} />}

      {images.length >= 2 && !isEnd && <Button onClick={handleClick} />}

      {isLoading && <Loader />}

      {isError && toast.error('Oops, something went wrong! Reload this page!')}

      <Toaster position="top-left" reverseOrder={false} />
    </div>
  );
};
