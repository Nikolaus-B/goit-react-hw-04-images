import { MdWavingHand } from 'react-icons/md';
import { StartContainer } from './StartMessage.styled';

export const StartMessage = () => {
  return (
    <StartContainer>
      <b>
        WELCOME <MdWavingHand style={{ color: '#3f51b5', fontSize: '20px' }} />
      </b>
      <p>
        We are glad to welcome you to our image search service, here you can
        find any image you like, all you need is to enter the query in the
        search field
      </p>
    </StartContainer>
  );
};
