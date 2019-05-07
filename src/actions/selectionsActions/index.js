export const logChoices = (company_ids) => dispatch => {
  console.log('companyId',company_ids);  
  dispatch({ type: 'LOG_CHOICES_START'});
  dispatch({ type: 'LOG_CHOICES_SUCCESS', payload: company_ids })
};