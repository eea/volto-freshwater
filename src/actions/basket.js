export const addItemToBasket = (item) => {
  return {
    type: 'ADD_TO_BASKET',
    payload: item,
  };
};

export const removeItemFromBasket = (item) => {
  return {
    type: 'REMOVE_FROM_BASKET',
    payload: item,
  };
};
