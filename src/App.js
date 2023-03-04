import './App.css';
import { AutocompleteWrapper } from './Autocomplete';
import { CarouselWrapper } from './Carousel';
import { PollWrapper } from './PollWidget/Wrapper';
import { ProgressBarWrapper } from './ProgressBar';
import { ProgressBarsWrapper } from './ProgressBars';
import { AccordionWrapper } from './Accordion';
import { AccordionIIWrapper } from './AccordionII';
import { AccordionIIIWrapper } from './AccordionIII';
import { LikeBtnWrapper } from './LikeButton';
import { AppUseDebounceExample } from './Hooks/CustomizeHooks/useDebounce';

function App() {
  return (
    <div className='App'>
      <h2>React Components:</h2>
      {/* <AutocompleteWrapper /> */}
      {/* <CarouselWrapper /> */}
      {/* <PollWrapper /> */}
      {/* <ProgressBarWrapper /> */}
      {/* <ProgressBarsWrapper /> */}
      {/* <AccordionWrapper /> */}
      {/* <AccordionIIWrapper /> */}
      {/* <AccordionIIIWrapper /> */}
      <LikeBtnWrapper />
      {/* <hr /> */}

      {/* <h2>Hooks examples:</h2> */}
      {/* <AppUseDebounceExample /> */}
    </div>
  );
}

export default App;
