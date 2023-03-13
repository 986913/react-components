import './App.css';
import { AutocompleteWrapper } from './Autocomplete';
import { CarouselWrapper } from './Carousel';
import { PollWrapper } from './PollWidget/Wrapper';
import { ProgressBarWrapper } from './ProgressBar';
import { ProgressBarsWrapper } from './ProgressBars';
import { ProgressBarsIIWrapper } from './ProgressBarsII';
import { ProgressBarsIIIWrapper } from './ProgressBarsIII';
import { ProgressBarsIIIIWrapper } from './ProgressBarsIIII';
import { AccordionWrapper } from './Accordion';
import { AccordionIIWrapper } from './AccordionII';
import { AccordionIIIWrapper } from './AccordionIII';
import { LikeBtnWrapper } from './LikeButton';
import { TabsWrapper } from './Tabs';
import { TabsIIWrapper } from './TabsII';
import { StarRatingWrapper } from './StarRating';
import { AppUseDebounceExample } from './Hooks/CustomizeHooks/useDebounce';

function App() {
  return (
    <div className='App'>
      {/* <h2>React Components:</h2> */}
      {/* <AutocompleteWrapper /> */}
      {/* <CarouselWrapper /> */}
      {/* <PollWrapper /> */}
      {/* <ProgressBarWrapper /> */}
      {/* <ProgressBarsWrapper /> */}
      {/* <ProgressBarsIIWrapper /> */}
      {/* <ProgressBarsIIIWrapper /> */}
      <ProgressBarsIIIIWrapper />
      {/* <AccordionWrapper /> */}
      {/* <AccordionIIWrapper /> */}
      {/* <AccordionIIIWrapper /> */}
      {/* <LikeBtnWrapper /> */}
      {/* <TabsWrapper /> */}
      {/* <TabsIIWrapper /> */}
      {/* <StarRatingWrapper /> */}

      {/* <hr /> */}

      {/* <h2>Hooks examples:</h2> */}
      {/* <AppUseDebounceExample /> */}
    </div>
  );
}

export default App;
