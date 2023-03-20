import './App.css';
import { AutocompleteWrapper } from './Autocomplete';
import { CarouselWrapper } from './Carousel';
import { CascaderWrapper } from './Cascader';
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
import { SpinnerWrapper } from './Spinner';
import { StarRatingWrapper } from './StarRating';
import { GridLightsWrapper } from './GridLights';
import { MentionsWrapperI } from './MentionsI';
import { MentionsWrapperII } from './MentionsII';
import { TrafficLightsWrapper } from './TrafficLights';
import { AnalogClockWrapper } from './AnalogClock';
import { DigitalClockWrapper } from './DigitalClock';
import { StopWatchWrapper } from './StopWatch';
import { GenerateTableWrapper } from './GenerateTable';
import { CalculatorWrapper } from './Calculator';
import { TreeViewWrapperI } from './TreeViewI';
import { TreeViewWrapperII } from './TreeViewII';
import { TodolistWrapper } from './TodoList/Wrapper';
import { TodolistWrapperII } from './TodoListII/Wrapper';
import { TodolistWrapperIII } from './TodoListIII/Wrapper';
import { TransferListWrapperI } from './TransferListI';
import { TransferListWrapperII } from './TransferListII';
import { PaginationWrapperI } from './PaginationI/Wrapper';
import { PaginationWrapperII } from './PaginationII/Wrapper';
import { InfiniteScrollWrapper } from './InfiniteScroll/Wrapper';
import { MultipleSelectWrapper } from './MultipleSelect';
import { AppUseDebounceExample } from './Hooks/CustomizeHooks/useDebounce';
import { AppUseCurrentDateExample } from './Hooks/CustomizeHooks/useCurentDate';

function App() {
  return (
    <div>
      {/* <AutocompleteWrapper /> */}

      {/* <CarouselWrapper /> */}

      {/* <CascaderWrapper /> */}

      {/* <PollWrapper /> */}

      {/* <GenerateTableWrapper /> */}

      {/* <TabsWrapper /> */}
      {/* <TabsIIWrapper /> */}

      {/* <StarRatingWrapper /> */}

      {/* <AccordionWrapper /> */}
      {/* <AccordionIIWrapper /> */}
      {/* <AccordionIIIWrapper /> */}

      {/* <InfiniteScrollWrapper /> */}

      {/* <TransferListWrapperI /> */}
      {/* <TransferListWrapperII /> */}

      {/* <MultipleSelectWrapper /> */}

      {/* <PaginationWrapperI /> */}
      {/* <PaginationWrapperII /> */}

      {/* <MentionsWrapperI /> */}
      {/* <MentionsWrapperII /> */}

      {/* <SpinnerWrapper /> */}

      {/* <TodolistWrapper /> */}
      {/* <TodolistWrapperII /> */}
      {/* <TodolistWrapperIII /> */}

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

      {/* <TreeViewWrapperI /> */}
      {/* <TreeViewWrapperII /> */}

      {/* <LikeBtnWrapper /> */}

      {/* <GridLightsWrapper /> */}
      {/* <TrafficLightsWrapper /> */}

      {/* <AnalogClockWrapper /> */}
      {/* <DigitalClockWrapper /> */}
      {/* <StopWatchWrapper /> */}

      {/* <CalculatorWrapper /> */}

      {/* ------below are Hooks examples----------------------------------------------------- */}
      {/* <AppUseDebounceExample /> */}
      {/* <AppUseCurrentDateExample /> */}
    </div>
  );
}

export default App;
