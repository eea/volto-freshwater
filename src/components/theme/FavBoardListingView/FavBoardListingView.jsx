import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupBy, sortBy } from 'lodash';
import { flattenToAppURL } from '@plone/volto/helpers';
import { List, Button, Form, Segment } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom';
import {
  getAllBookmarks,
  deleteBookmark,
} from '@collective/volto-bookmarks/actions';
import {
  addComment,
  deleteComment,
} from '@eeacms/volto-freshwater/actions/favBoardComments';
import clearSVG from '@plone/volto/icons/delete.svg';
import './style.less';

const FavBoardListingView = (props) => {
  const items = useSelector((state) => state.collectivebookmarks?.items || []);
  const bookmarkdelete = useSelector(
    (state) => state.collectivebookmarks?.delete || {},
  );
  const comments = useSelector(
    (state) => state.favBoardComments?.comments || [],
  );

  const [groupedItems, setGroupedItems] = useState({});
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkdelete === 'loaded') {
      dispatch(getAllBookmarks());
    }
  }, [bookmarkdelete, dispatch]);

  useEffect(() => {
    const favItems = groupBy(items, (item) => item['group']);
    Object.keys(favItems).forEach((item) => {
      favItems[item] = sortBy(favItems[item], [
        function (o) {
          return o.title.toLowerCase();
        },
      ]);
    });
    setGroupedItems(favItems);
  }, [dispatch, items]);

  const handleDeleteBookmark = (uid, group, searchquery) => {
    dispatch(deleteBookmark(uid, group, searchquery));
  };

  return (
    <div className="favorites-listing ui container">
      {Object.keys(groupedItems)
        .sort()
        .map((group, index) => {
          return (
            <div className="fav-listing-board" key={index}>
              <h3>{group}</h3>
              {groupedItems[group].map((item, index) => (
                <List key={index}>
                  <List.Item>
                    <List.Content>
                      <Link
                        title={item.description || ''}
                        to={`${flattenToAppURL(item['@id'])}`}
                      >
                        {item.title}
                      </Link>
                      <Button
                        icon
                        basic
                        className="delete-fav-btn"
                        onClick={() => {
                          handleDeleteBookmark(
                            item.uid,
                            item.group,
                            item.queryparams || '',
                          );
                        }}
                      >
                        <Icon name={clearSVG} size="16px" />
                      </Button>
                    </List.Content>
                  </List.Item>
                </List>
              ))}

              {comments
                .filter((item, i) => item.group === group)
                .map((item, i) => (
                  <div key={i} className="comment-wrapper">
                    <Segment>
                      <p>{item.comment}</p>
                    </Segment>
                    <Button
                      icon
                      basic
                      className="delete-comment"
                      onClick={() => {
                        dispatch(deleteComment(item.comment, group));
                      }}
                    >
                      <Icon name={clearSVG} size="16px" />
                    </Button>
                  </div>
                ))}

              <Form className="comment-form">
                <Form.Field>
                  <label htmlFor="field-comment">Enter comments below:</label>
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
                    dispatch(addComment(comment, group));
                    setComment('');
                  }}
                >
                  Comment
                </Button>
              </Form>
            </div>
          );
        })}
    </div>
  );
};

export default FavBoardListingView;
