import React, { useEffect, useState, useCallback } from 'react';
import cx from 'classnames';

const StickyHeader = (props) => {
  const { stickyBreakpoint } = props;
  const innerWidth = __CLIENT__ && window && window.innerWidth;
  const scrollY = __CLIENT__ && window && window.scrollY;

  const [width, setWidth] = useState(innerWidth);
  const [y, setY] = useState(scrollY);
  const [scrollingUp, setScrollingUp] = useState(false);

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY && window.pageYOffset > 100) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }
      setY(window.scrollY);
    },
    [y],
  );

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={cx({
        'sticky-header': scrollingUp && width < stickyBreakpoint,
      })}
    >
      {props.children}
    </div>
  );
};

export default StickyHeader;
