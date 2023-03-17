import './App.css';
import { AutocompleteWrapper } from './Autocomplete';
import { CarouselWrapper } from './Carousel';
import { PollWrapper } from './PollWidget/Wrapper';
import { ProgressBarWrapper } from './ProgressBar';
import { ProgressBarIWrapper } from './ProgressBarI';
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
import { GridLightsWrapper } from './GridLights';
import { TrafficLightsWrapper } from './TrafficLights';
import { AnalogClockWrapper } from './AnalogClock';
import { DigitalClockWrapper } from './DigitalClock';
import { AppUseDebounceExample } from './Hooks/CustomizeHooks/useDebounce';
import { AppUseCurrentDateExample } from './Hooks/CustomizeHooks/useCurentDate';

function App() {
  return (
    <div className='App'>
      {/* <h2>React Components:</h2> */}

      {/* <AutocompleteWrapper /> */}

      {/* <CarouselWrapper /> */}

      {/* <PollWrapper /> */}

      {/* 
        下面4个progress components没有计算， 全都基于CSS:
          from transform: scaleX(0) to transform: scaleX(1) + transition-duration
      */}
      {/* <ProgressBarWrapper /> */}
      {/* <ProgressBarsWrapper /> */}
      {/* <ProgressBarsIIWrapper /> */}
      {/* <ProgressBarsIIIWrapper /> */}
      {/* 
        下面ProgressBarsIIIIWrapper 和 ProgressBarIWrapper是重点， 因为场景更多见：
          1. 需要计算每10ms增加具体多少的progress
          2. 有interaction行为，比如start, pause, reset etc
      */}
      {/* <ProgressBarIWrapper /> */}
      {/* <ProgressBarsIIIIWrapper /> */}

      {/* <AccordionWrapper /> */}
      {/* <AccordionIIWrapper /> */}
      {/* <AccordionIIIWrapper /> */}

      {/* <LikeBtnWrapper /> */}

      {/* <TabsWrapper /> */}
      {/* <TabsIIWrapper /> */}

      {/* <StarRatingWrapper /> */}

      {/* <GridLightsWrapper /> */}
      <TrafficLightsWrapper />

      {/* <AnalogClockWrapper /> */}
      {/* <DigitalClockWrapper /> */}

      {/* ------below are Hooks examples----------------------------------------------------- */}
      {/* <AppUseDebounceExample /> */}
      {/* <AppUseCurrentDateExample /> */}
    </div>
  );
}

export default App;
