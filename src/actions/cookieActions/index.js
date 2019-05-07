import data from '../../vendor/data.json';

export const userAcceptedAllCookies = () => dispatch => {
  dispatch({ type: 'ACCEPT_ALL_COOKIES_START' });
  localStorage.setItem('sh_gdpr_cookie','accepted');
  dispatch(acceptAllCookiesSuccess({ 'user_cookie': 'accepted', 'hide_modal': true }));
};

const acceptAllCookiesSuccess = (payload) => {
  return { type: 'ACCEPT_ALL_COOKIES_SUCCESS', payload }
};

export const setRejectCookie = () => dispatch => {
  dispatch({ type: 'COOKIE_REJECT_START' });
  localStorage.setItem('sh_gdpr_cookie','rejected');
  dispatch(cookieRejectSuccess({ 'user_cookie':'rejected','hide_modal': true }));
};

const cookieRejectSuccess = (payload) => {
  return { type: 'COOKIE_REJECT_SUCCESS', payload }
};

export const checkForExistingUserGDPRCookie = () => dispatch => {
  dispatch({ type: 'USER_GDPR_COOKIE_CHECK_START' });
  let user_cookie = localStorage.getItem('sh_gdpr_cookie');
  if(!user_cookie){
    dispatch(userCookieNotSet({ 'hide_modal': false, 'user_cookie': 'not-set' }));
  };
  if(user_cookie === 'accepted'){
    dispatch(cookiesAcceptedHideModal({ 'hide_modal': true, 'user_cookie': 'accepted' }));
  };
  if(user_cookie === 'rejected'){
    dispatch(cookiesRejectedHideModal({ 'hide_modal': true, 'user_cookie': 'rejected' }));
  };
};

const cookiesAcceptedHideModal = (payload) => {
  return { type: 'USER_GDPR_COOKIE_PREVIOUSLY_ACCEPTED', payload }
};

const cookiesRejectedHideModal = (payload) => {
  return { type: 'USER_GDPR_COOKIE_PREVIOUSLY_REJECTED', payload }
};

const userCookieNotSet = (payload) => {
  return { type: 'USER_COOKIE_NOT_SET', payload }
};

export const showPurposes = () => dispatch => {
  dispatch({ type: 'SHOW_PURPOSES_START' });
  dispatch(showPurposesSuccess(data));
};

const showPurposesSuccess = (payload) => {
  return { type: 'SHOW_PURPOSES_SUCCESS', payload }
};

