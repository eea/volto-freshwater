import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

const ItemTitle = (props) => {
  const { item, token } = props;
  const url = item.source ? item.source[0]['@id'] : item['@id'];

  return (
    <>
      {token ? (
        <>
          {item && (
            <h3>
              <a href={url}>{item.title}</a>
            </h3>
          )}
        </>
      ) : (
        <>{item && <h3>{item.title}</h3>}</>
      )}
    </>
  );
};

export default compose(
  withRouter,
  injectIntl,
)(
  connect((state) => ({
    token: state.userSession.token,
  }))(ItemTitle),
);
