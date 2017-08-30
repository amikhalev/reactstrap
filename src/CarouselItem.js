import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition'
import { mapToCssModules } from './utils';
import CarouselCaption from './CarouselCaption';

class CarouselItem extends React.Component {
  constructor(props) {
    super(props)
    
    this.componentWillExit = this.componentWillExit.bind(this);
    this.componentDidExit = this.componentDidExit.bind(this);
  }

  componentWillExit() {
    this.slide.dispatchEvent(new CustomEvent('slide.bs.carousel'));
  }

  componentDidExit() {
    this.slide.dispatchEvent(new CustomEvent('slid.bs.carousel'));
  }

  render() {
    const { src, altText, children, cssModule } = this.props;
    const imgClasses = mapToCssModules(classNames(
        'd-block',
        'img-fluid'
    ), cssModule);


    return (
      <Transition
        in={true}
        onExiting={this.componentWillExit}
        onExited={this.componentDidExit}
        timeout={500}
      >
        {(status) => {
          console.log("altText: ", altText, ", status: ", status);
          const { direction } = this.context;
          const isActive = (status === 'entering') || (status === 'entered') || (status === 'exiting')
          const itemClasses = mapToCssModules(classNames(
            'carousel-item',
            isActive && 'active',
            (status === 'entering' || status === 'exiting') &&
              (direction === 'right' ? 'carousel-item-left' : 'carousel-item-right'),   
            (status === 'entering') &&
              (direction === 'right' ? 'carousel-item-next' : 'carousel-item-prev'),
          ), cssModule);

          return (
            <div className={itemClasses} ref={(slide) => { this.slide = slide; }}>
              <img className={imgClasses} src={src} alt={altText} />
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  altText: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.instanceOf(CarouselCaption)
};

CarouselItem.contextTypes = {
  direction: PropTypes.string
};

export default CarouselItem;
