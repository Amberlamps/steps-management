import get from 'lodash/get';

export const selectUsername = (state) => get(state, 'articles.username');
export const selectAge = (state) => get(state, 'payments.age');
export const selectZip = (state) => get(state, 'returnOptions.zip');

export const selectStepsItems = (state) => get(state, 'steps.items');
export const selectStepsLoadingStatus = (state) => get(state, 'steps.loadingStatus');
