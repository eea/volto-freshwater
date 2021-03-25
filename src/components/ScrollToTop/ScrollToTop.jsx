/**
 * ScrollToTop component.
 * @module components/ScrollToTop/ScrollToTop
 */

import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Icon } from 'semantic-ui-react';

import './scrollToTop.less';

const messages = defineMessages({
  scrollToTop: {
    id: 'Scroll to top',
    defaultMessage: 'Scroll to top',
  },
});

const ScrollToTop = () => {
  const intl = useIntl();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {isVisible && (
        <div className="scroll-to-top">
          <Button
            icon
            color="blue"
            title={intl.formatMessage(messages.scrollToTop)}
            onClick={scrollToTop}
          >
            <Icon name="arrow up" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
