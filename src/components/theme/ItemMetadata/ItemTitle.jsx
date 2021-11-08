import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ItemTitle = (props) => {
  const { item, token } = props;
  const url = item.source ? item.source[0]['@id'] : item['@id'];

  return item ? (
    <>
      {token ? (
        <h3>
          <Link to={url}>{item.title}</Link>
        </h3>
      ) : (
        <h3>{item.title}</h3>
      )}
    </>
  ) : (
    ''
  );
};

export default compose(
  connect((state) => ({
    token: state.userSession.token,
  })),
)(ItemTitle);
