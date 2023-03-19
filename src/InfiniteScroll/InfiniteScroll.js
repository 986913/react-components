import React from 'react';
import './infinitescoll.css';

export class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageNo: 0,
      prevY: 0,
    };
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    this.observer = new IntersectionObserver(this.handleObserver, options);
    this.observer.observe(this.loadingRef);
  }

  handleObserver = (entities, observer) => {
    const { prevY, pageNo } = this.state;
    const { loadMore } = this.props;
    this.setState({ loading: true });
    const y = entities[0].boundingClientRect.y;
    if (prevY > y) {
      loadMore(pageNo + 1);
      this.setState({ pageNo: pageNo + 1, loading: false });
    }
    this.setState({ prevY: y });
  };

  render() {
    const { loading } = this.state;
    const { children, height } = this.props;
    return (
      <div>
        <div style={{ minHeight: `${height}px`, border: '1px solid black' }}>
          {children}
        </div>
        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          className='loading'
        >
          {loading && <span>Loading...</span>}
        </div>
      </div>
    );
  }
}
