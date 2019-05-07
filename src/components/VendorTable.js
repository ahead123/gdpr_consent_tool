import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RadioGroup } from 'styleguide';
import { logChoices } from '../actions/selectionsActions';

class VendorTable extends Component {
  
  render() {
    return (
      <table className="table text-left">
        <thead>
          <tr>
            <th className="active">Company</th>                    
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.companies.map(company => {
              return company.id === 230 || company.id === 21 || company.id === 118 ?
               (
                <tr key={Math.random()} id={company.id}>
                  <td>
                    {company.name}
                    <div>
                      <p><a href={company.policyUrl}>{company.policyUrl}</a></p>
                    </div>            
                  </td>                
                  <td className="actions" id={company.id}>
                    <RadioGroup
                      animated
                      label="On | Off"
                      onChange={value => {                                                                                    
                        if( value==="off" ){
                         this.props.selections.push(company.id)
                         console.log(company.id, value)
                        }else{
                          for( let i in this.props.selections ){ 
                            if ( this.props.selections[i] === company.id ) {
                              this.props.selections.splice(i, 1); 
                            }
                          }
                        }                    
                      }}
                      options={[{ value: 'on' },{ value: 'off' }]}
                    />
                  </td>                
                </tr> 
               ) : null
            })
          }         
        </tbody>
      </table>
    )
  }
  
}

const mapDispatchToProps = { logChoices }

const mapStateToProps = ({ selectionsReducer }) => {
  return { ...selectionsReducer }
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorTable);


