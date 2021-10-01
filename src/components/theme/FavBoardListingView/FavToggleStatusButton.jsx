import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { modifyBookmark } from '@eeacms/volto-freshwater/actions';
import './toggle.less';

const ToggleButton = (props) => {
  const { className, groupedItems } = props;
  const initialState = groupedItems.items[0].payload['status'] || 'public';
  const [toggle, setToggle] = useState(initialState);
  const dispatch = useDispatch();

  const triggerToggle = () => {
    const newState = toggle === 'public' ? 'private' : 'public';

    for (let item of groupedItems.items) {
      dispatch(
        modifyBookmark(item.uid, item.group, item.hash || '', {
          data: item,
          status: newState,
        }),
      );
    }

    setToggle(toggle === 'public' ? 'private' : 'public');
  };
  const toggleClasses = classNames(
    'wrg-toggle',
    {
      'wrg-toggle--checked': toggle === 'private',
    },
    className,
  );

  return (
    <div
      className={toggleClasses}
      onClick={triggerToggle}
      onKeyDown={triggerToggle}
      role="button"
      tabIndex="0"
    >
      <div className="wrg-toggle-container">
        <div className="wrg-toggle-check">
          <span>Private</span>
        </div>
        <div className="wrg-toggle-uncheck">
          <span>Public</span>
        </div>
      </div>
      <div className="wrg-toggle-circle"></div>
      <input
        className="wrg-toggle-input"
        type="checkbox"
        aria-label="Toggle Button"
      />
    </div>
  );
};

export default ToggleButton;
