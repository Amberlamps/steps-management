import get from 'lodash/get';

export const selectUser = (state) => get(state, 'user');

export const selectUsername = (state) => get(state, 'user.username');
export const selectAge = (state) => get(state, 'user.age');
export const selectZip = (state) => get(state, 'user.zip');

export const selectStepsItems = (state) => get(state, 'steps.items');
export const selectStepsLoadingStatus = (state) => get(state, 'steps.loadingStatus');

export const selectNextButtonStatus = (state) => get(state, 'stepsManager.next.loadingStatus');
export const selectNextButtonError = (state) => get(state, 'stepsManager.next.error');

export const selectUsernameError = (state) => get(state, 'articles.usernameError');

export const selectErrorHandler = (state) => get(state, 'errorHandler');
