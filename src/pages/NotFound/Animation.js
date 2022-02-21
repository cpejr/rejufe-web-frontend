import { maxWidth, width } from '@mui/system';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation.json';
import { useEffect } from 'react';

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    function Width() {
      if (
        (document.documentElement.clientWidth * this.props.width) / 100 <
        this.props.minWidth
      ) {
        console.log(this.props.minWidth);
        return this.props.minWidth;
      }
      if (
        (document.documentElement.clientWidth * this.props.width) / 100 >
        this.props.maxWidth
      ) {
        console.log(this.props.maxWidth);
        return this.props.maxWidth;
      }
      return (document.documentElement.clientWidth * this.props.width) / 100;
    }

    function Height() {
      if (
        (document.documentElement.clientHeight * this.props.height) / 100 <
        this.props.minHeight
      )
        return this.props.minHeight;
      if (
        (document.documentElement.clientHeight * this.props.height) / 100 >
        this.props.maxHeight
      )
        return this.props.maxHeight;
      return (document.documentElement.clientHeight * this.props.height) / 100;
    }

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={() => {
            console.log('Entrei Height');
            Height();
          }}
          width={() => {
            console.log('Entrei Width');
            Width();
          }}
        />
      </div>
    );
  }
}
