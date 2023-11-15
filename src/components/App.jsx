import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { ErrorText } from './ErrorText/ErrorText';
import { Container, GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';
import { fetchImages } from './api';
import { StartMessage } from './StartMessage/StartMessage';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      const clearQuery = query.split('/').pop();
      try {
        setIsLoading(true);
        setError(false);

        const newImages = await fetchImages(clearQuery, page);

        if (newImages.length === 0) {
          toast.error('No more images available');
        } else {
          setImages(prevImages => [...prevImages, ...newImages]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
        setIsFirstRender(false);
      }
    }

    getImages();
  }, [query, page]);

  const onSubmitClick = searchedQuery => {
    setImages([]);
    setQuery(`${Date.now()}/${searchedQuery}`);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar submitClick={onSubmitClick} />
      {error && <ErrorText />}
      {isFirstRender && <StartMessage />}
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && <Button loadMoreBtnClick={onLoadMoreClick} />}
      <GlobalStyle />
      <Toaster />
    </Container>
  );
};
