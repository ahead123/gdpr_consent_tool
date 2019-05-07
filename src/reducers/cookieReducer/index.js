export default (state={}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ACCEPT_ALL_COOKIES_SUCCESS':
      return { ...state, 'user_cookie': payload.user_cookie, 'hide_modal': payload.hide_modal }
    case 'COOKIE_REJECT_SUCCESS':
      return { ...state, 'user_cookie': payload.user_cookie, 'hide_modal': payload.hide_modal }
    case 'USER_GDPR_COOKIE_PREVIOUSLY_ACCEPTED':
      return { ...state, 'user_cookie': payload.user_cookie, 'hide_modal': payload.hide_modal }
    case 'USER_GDPR_COOKIE_PREVIOUSLY_REJECTED':
      return { ...state, 'user_cookie': payload.user_cookie, 'hide_modal': payload.hide_modal }
    case 'USER_COOKIE_NOT_SET':
      return { ...state, 'user_cookie': payload.user_cookie, 'hide_modal': payload.hide_modal }  
    case 'SHOW_PURPOSES_SUCCESS':
      return { ...state, 'purposes': payload }
    case 'SHOW_PURPOSES_FAIL':
      return { ...state, 'error': payload }  
    default:
      return state;
  }
};