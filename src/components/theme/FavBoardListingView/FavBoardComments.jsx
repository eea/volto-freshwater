import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Button, Form, Item } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import jwtDecode from 'jwt-decode';
import {
  addComment,
  deleteComment,
} from '@eeacms/volto-freshwater/actions/favBoardComments';
import clearSVG from '@plone/volto/icons/delete.svg';
import './style.less';

const FavBoardComments = (props) => {
  const { board, userId } = props;
  const comments = useSelector(
    (state) => state.favBoardComments?.comments || [],
  );
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="fav-board-comments-wrapper">
      <Item.Group className="board-comments">
        {comments
          .filter((item, i) => item.group === board)
          .map((item, i) => (
            <Item key={i}>
              <Item.Content>
                <Item.Meta>
                  <div>{userId}:</div>
                  <Button
                    icon
                    basic
                    className="delete-comment"
                    onClick={() => {
                      dispatch(deleteComment(item.comment, board));
                    }}
                  >
                    <Icon name={clearSVG} size="16px" />
                  </Button>
                </Item.Meta>
                <Item.Description>
                  <p>{item.comment}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>

      <Form className="comment-form">
        <Form.Field>
          <label htmlFor="field-comment">Leave a comment:</label>
          <textarea
            id="field-comment"
            rows="4"
            cols="50"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </Form.Field>
        <Button
          primary
          size="mini"
          onClick={() => {
            dispatch(addComment(comment, board));
            setComment('');
          }}
        >
          Comment
        </Button>
      </Form>
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
