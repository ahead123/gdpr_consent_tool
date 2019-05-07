export default (state={}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOG_CHOICES_SUCCESS':
      return {...state, company_ids: payload.company_ids, 'hide_modal': payload.hide_modal }
    default:
      return state;
  }
};