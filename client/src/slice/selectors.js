import { createSelector } from 'reselect';

// Selector to get the list of items
const selectList = (state) => state.items.list;

// Memoized selector to get product counts
export const selectProductCounts = createSelector(
  [selectList],
  (list) => list.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {})
);

// Selector to get the total price
export const selectTotalPrice = (state) => state.items.price;