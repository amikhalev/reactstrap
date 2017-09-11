import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';
import { mapToCssModules, omit } from './utils';

const propTypes = {
  ...Transition.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  baseClass: PropTypes.string.isRequired,
  baseClassActive: PropTypes.string.isRequired,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  tag: 'div',
  baseClass: 'fade',
  baseClassActive: 'show',
  timeout: 150,
  appear: true,
  enter: true,
  exit: true,
  in: true,
};

function Fade(props) {
  const {
    tag: Tag,
    baseClass,
    baseClassActive,
    className,
    cssModule,
    children,
    ...transitionProps
  } = props;
  const otherProps = omit(transitionProps, Object.keys(propTypes));

  return (
    <Transition {...props}>
      {(status) => {
        const isActive = status === 'entering' || status === 'entered';
        const classes = mapToCssModules(classNames(
          className,
          baseClass,
          isActive ? baseClassActive : false
        ), cssModule);
        return <Tag className={classes} {...otherProps}>
          {children}
        </Tag>;
      }}
    </Transition>
  );
}

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;

export default Fade;
