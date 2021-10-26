import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cx from 'classnames';
import {
  getAllBookmarks,
  modifyBookmark,
} from '@eeacms/volto-freshwater/actions';
import './toggle.less';

const ToggleButton = (props) => {
  const { groupedItems, boardsModify } = props;
  const initialState = groupedItems.items[0].payload['status'] || 'public';
  const [toggle, setToggle] = useState(initialState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (boardsModify === 'loaded') {
      dispatch(getAllBookmarks());
    }
  }, [dispatch, boardsModify]);

  const triggerToggle = () => {
    const newState = toggle === 'public' ? 'private' : 'public';

    for (let item of groupedItems.items) {
      dispatch(
        modifyBookmark(item.uid, item.group, item.hash || '', {
          data: item.payload.data,
          status: newState,
          comments: item.payload.comments,
        }),
      );
    }

    setToggle(toggle === 'public' ? 'private' : 'public');
  };

  return (
    <div
      className={cx('wrg-toggle', {
        'wrg-toggle--checked': toggle === 'private',
      })}
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

export default compose(
  connect((state) => ({
    boardsModify: state.favBoards?.modify || {},
  })),
)(ToggleButton);
