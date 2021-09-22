import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  addComment,
  deleteComment,
} from '@eeacms/volto-freshwater/actions/favBoardComments';
import clearSVG from '@plone/volto/icons/delete.svg';
import './style.less';

const FavBoardComments = (props) => {
  const { board } = props;
  const comments = useSelector(
    (state) => state.favBoardComments?.comments || [],
  );
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="fav-board-comments-wrapper">
      {comments
        .filter((item, i) => item.group === board)
        .map((item, i) => (
          <div key={i} className="board-comment">
            <Segment>
              <p>{item.comment}</p>
            </Segment>
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
          </div>
        ))}

      <Form className="comment-form">
        <Form.Field>
          <label htmlFor="field-comment">Add comments below:</label>
          <textarea
            id="field-comment"
            rows="4"
            cols="50"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </Form.Field>
        <Button
          primary
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

export default FavBoardComments;
