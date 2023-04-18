// This is a React Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function renderWithError() {
  throw new Error('error');
}

function A() {
  return <ErrorBoundary name='boundary-2'>{renderWithError()}</ErrorBoundary>;
}

function App() {
  return (
    <ErrorBoundary name='boundary-1'>
      <A />
    </ErrorBoundary>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    console.log(this.props.name);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

/**
 "boundary-1"  // cause error occurred inside component, not in children's
 */
