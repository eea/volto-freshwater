import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import jwtDecode from 'jwt-decode';
import { Button, Form, Item, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  getAllBookmarks,
  modifyBookmark,
} from '@eeacms/volto-freshwater/actions/boards';
import queryString from 'query-string';
import clearSVG from '@plone/volto/icons/delete.svg';
import moment from 'moment';
import './style.less';

const CommentForm = (props) => {
  const { dispatch, groupedItems, comments, userId, paramOwner } = props;
  const [inputComment, setInputComment] = useState();
  const date = new Date();

  return (
    paramOwner === userId && (
      <Form className="comment-form">
        <Form.Field>
          <Input
            placeholder="Add comment"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                for (let item of groupedItems) {
                  dispatch(
                    modifyBookmark(item.uid, item.group, item.hash || '', {
                      data: item.payload.data,
                      status: item.payload.status,
                      comments: [
                        ...(comments ? [...comments] : ''),
                        { comment: inputComment, date: date },
                      ],
                    }),
                  );
                }
                setInputComment('');
              }
            }}
          />
        </Form.Field>
      </Form>
    )
  );
};

const FavBoardComments = (props) => {
  const { groupedItems = [], userId, boardsModify } = props;
  const dispatch = useDispatch();
  const comments = groupedItems[0]?.payload?.comments;
  const owner = groupedItems[0].owner;
  const urlParams = queryString.parse(props.location.search);
  const paramOwner = urlParams ? urlParams['user'] : '';

  React.useEffect(() => {
    if (boardsModify === 'loaded') {
      dispatch(getAllBookmarks(paramOwner));
    }
  }, [dispatch, boardsModify, paramOwner]);

  const getCommentDate = (d) => {
    return moment(d).format('ll');
  };

  return (
    <div className="fav-board-comments-wrapper">
      {comments && comments.length > 0 && (
        <h4 className="comments-title">COMMENTS</h4>
      )}
      {groupedItems && groupedItems.length > 0 && (
        <Item.Group className="board-comments">
          {(comments || []).map((c, i) => (
            <Item key={i}>
              <Item.Content>
                <Item.Meta>
                  <div className="meta-left-section">
                    <span className="comment-owner">{owner}</span>
                    <span className="comment-date">
                      {getCommentDate(c.date)}
                    </span>
                  </div>
                  {paramOwner === userId && (
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
                  )}
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
            paramOwner={paramOwner}
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
    boardsModify: state.boards?.modify || {},
  })),
)(FavBoardComments);
