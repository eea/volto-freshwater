import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { get, groupBy, sortBy } from 'lodash';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { List, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom';
import { removeItemFromBasket } from '@eeacms/volto-freshwater/actions/favBoard';
import {
  getAllBookmarks,
  deleteBookmark,
} from '@collective/volto-bookmarks/actions';
import clearSVG from '@plone/volto/icons/clear.svg';
import './style.less';

const FavBoardListingView = (props) => {
  const items = useSelector((state) => state.collectivebookmarks?.items || []);
  const bookmarkdelete = useSelector(
    (state) => state.collectivebookmarks?.delete || {},
  );
  const [groupedItems, setGroupedItems] = useState({});
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
      <h2>Boards:</h2>

      {Object.keys(groupedItems)
        .sort()
        .map((grp, index) => {
          return (
            <>
              <h3>
                {get(
                  config.settings?.bookmarks?.bookmarkgroupmapping,
                  grp,
                  grp,
                )}
              </h3>

              {groupedItems[grp].map((item, index) => (
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
                        <Icon name={clearSVG} size="25px" />
                      </Button>
                    </List.Content>
                  </List.Item>
                </List>
              ))}
            </>
          );
        })}
    </div>
  );
};

export default FavBoardListingView;
