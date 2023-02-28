import './App.css';
import { AutocompleteWrapper } from './Autocomplete';
import { CarouselWrapper } from './Carousel';
import { PollWrapper } from './PollWidget/Wrapper';
import { ProgressBarWrapper } from './ProgressBar';
import { ProgressBarsWrapper } from './ProgressBars';

function App() {
  return (
    <div className='App'>
      {/* <AutocompleteWrapper /> */}
      {/* <CarouselWrapper /> */}
      {/* <PollWrapper /> */}
      <ProgressBarWrapper />
      <ProgressBarsWrapper />
    </div>
  );
}

export default App;
