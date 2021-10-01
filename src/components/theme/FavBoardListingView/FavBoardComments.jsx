import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import jwtDecode from 'jwt-decode';
import { Button, Form, Item } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  getAllBookmarks,
  modifyBookmark,
} from '@eeacms/volto-freshwater/actions/favBoards';
import queryString from 'query-string';
import clearSVG from '@plone/volto/icons/delete.svg';
import './style.less';

const CommentForm = (props) => {
  const { dispatch, groupedItems, comments, userId } = props;
  const [inputComment, setInputComment] = useState();
  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : '';
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const datestring = month + ' ' + date.getDay() + ', ' + date.getFullYear();

  return (
    paramOwner === userId && (
      <Form className="comment-form">
        <Form.Field>
          <label htmlFor="field-comment">Leave a comment:</label>
          <textarea
            id="field-comment"
            rows="4"
            cols="50"
            placeholder="Add a comment..."
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          ></textarea>
        </Form.Field>
        <Button
          primary
          size="mini"
          onClick={() => {
            for (let item of groupedItems) {
              dispatch(
                modifyBookmark(item.uid, item.group, item.hash || '', {
                  data: item.payload.data,
                  status: item.payload.status,
                  comments: [
                    ...(comments ? [...comments] : ''),
                    { comment: inputComment, date: datestring },
                  ],
                }),
              );
            }
            setInputComment('');
          }}
        >
          Comment
        </Button>
      </Form>
    )
  );
};

const FavBoardComments = (props) => {
  const { userId, groupedItems = [] } = props;
  const modified = useSelector((state) => state.favBoards?.modify || {});
  const dispatch = useDispatch();
  const comments = groupedItems[0]?.payload?.comments;

  React.useEffect(() => {
    if (modified === 'loaded') {
      dispatch(getAllBookmarks());
    }
  }, [dispatch, modified]);

  return (
    <div className="fav-board-comments-wrapper">
      {comments && comments.length > 0 && <h4>Comments:</h4>}
      {groupedItems && groupedItems.length > 0 && (
        <Item.Group className="board-comments">
          {(comments || []).map((c, i) => (
            <Item key={i}>
              <Item.Content>
                <Item.Meta>
                  <div className="meta-left-section">
                    <span>{userId}</span>
                    <span className="comment-dot"></span>
                    <span className="comment-date">{c.date}</span>
                  </div>
                  <Button
                    icon
                    basic
                    className="delete-comment"
                    onClick={() => {
                      for (let item of groupedItems) {
                        const newComments = [...item.payload.comments];
                        newComments.splice(i, 1);
                        dispatch(
                          modifyBookmark(
                            item.uid,
                            item.group,
                            item.hash || '',
                            {
                              data: item.payload.data,
                              status: item.payload.status,
                              comments: newComments,
                            },
                          ),
                        );
                      }
                    }}
                  >
                    <Icon name={clearSVG} size="16px" />
                  </Button>
                </Item.Meta>
                <Item.Description>
                  <p>{c.comment}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}

          <CommentForm
            {...props}
            groupedItems={groupedItems}
            dispatch={dispatch}
            comments={comments}
          />
        </Item.Group>
      )}
    </div>
  );
};

export default compose(
  connect((state) => ({
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  })),
)(FavBoardComments);
