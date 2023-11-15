import { useState } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/ModalImage/ModalImage';

export const ImageGalleryItem = ({ img, largeImg, tag }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GalleryItem>
      <GalleryImage onClick={openModal} src={img} alt={tag} />
      <ModalImage
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        largeImg={largeImg}
        topic={tag}
      />
    </GalleryItem>
  );
};
