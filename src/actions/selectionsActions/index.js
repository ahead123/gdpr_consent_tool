export const logChoices = (company_ids) => dispatch => {
  console.log('companyId',company_ids); 
  if(company_ids.length >= 1){
    let choices = company_ids.join(",");
    localStorage.setItem('sh_gdpr_cookie', choices);
  };  
  dispatch({ type: 'LOG_CHOICES_START'});
  dispatch(logChociesSuccess({ company_ids, 'hide_modal': true }))
  //dispatch({ type: 'LOG_CHOICES_SUCCESS', payload: company_ids, 'hide_modal': true })
};

const logChociesSuccess = (payload) => {
  return { type: 'LOG_CHOICES_SUCCESS', payload }
};