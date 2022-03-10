import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation.json';

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    const { width, height } = this.props;
    const { isStopped, isPaused } = this.state;

    return (
      <div>
        <Lottie
          width={`${width}%`}
          height={`${height}%`}
          options={defaultOptions}
          isStopped={isStopped}
          isPaused={isPaused}
        />
      </div>
    );
  }
}
