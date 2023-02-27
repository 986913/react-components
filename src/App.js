import './App.css';
import { AutocompleteWrapper } from './Autocomplete';
import { CarouselWrapper } from './Carousel';
import { PollWrapper } from './PollWidget/Wrapper';
import { ProgressBarWrapper } from './ProgressBar';

function App() {
  return (
    <div className='App'>
      {/* <AutocompleteWrapper /> */}
      {/* <CarouselWrapper /> */}
      <PollWrapper />
      <ProgressBarWrapper />
    </div>
  );
}

export default App;
