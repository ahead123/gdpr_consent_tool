export default (state={}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOG_CHOICES_SUCCESS':
      return {...state, company_ids: payload}
    default:
      return state;
  }
};