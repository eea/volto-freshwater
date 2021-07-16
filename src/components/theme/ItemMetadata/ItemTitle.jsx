import React from 'react';

const ItemTitle = (props) => {
  const { item } = props;

  return <>{item && <h3>{item.title}</h3>}</>;
};

export default ItemTitle;
