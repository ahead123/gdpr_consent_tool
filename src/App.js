import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, ModalBody, ModalFooter } from 'styleguide';
import { 
  checkForExistingUserGDPRCookie, 
  setRejectCookie,
  userAcceptedAllCookies,
  showPurposes
} from './actions/cookieActions';
import { logChoices } from './actions/selectionsActions';
import VendorTable from './components/VendorTable';
import { ConsentString } from 'consent-string';
import vendorList from './vendor/data.json';

const consentData = new ConsentString();
const decodedString = new ConsentString('BOeDDakOeDDakABABBENCB-AAAAjWADAAqAHYAcw');
console.log('decodedString',decodedString);
// Set the global vendor list
// You need to download and provide the vendor list yourself
// It can be found here - https://vendorlist.consensu.org/vendorlist.json
consentData.setGlobalVendorList(vendorList);

// Set the consent data
consentData.setCmpId(1);
consentData.setCmpVersion(1);
consentData.setConsentScreen(1);
consentData.setConsentLanguage('en');
consentData.setPurposesAllowed([1, 2, 3, 4, 5]);
consentData.setVendorsAllowed([230, 21, 118]);

// Encode the data into a web-safe base64 string
console.log(consentData.getConsentString());

class App extends Component {

  state = {
    selections: []
  }
   
  componentWillMount = () => {
    this.props.checkForExistingUserGDPRCookie();    
    this.props.showPurposes();
  };

  getSelections = (selections) => {
    const filteredSelections = selections.sort().filter(function(item, pos, ary) {
          return !pos || item !== ary[pos - 1];
      })
    console.log(filteredSelections);
    this.props.logChoices(filteredSelections)
    this.setState({selections: filteredSelections})
  }

  render() {
    console.log('state',this.state)
    console.log('this.props',this.props);    
    const { hide_modal } = this.props;
    let visibility = 'block';  
    if(hide_modal === undefined || hide_modal === true){ visibility = 'none' }; 
    return (
      <div className="row bg-b2" style={{ 'display': visibility }}>

        <div className="column-12 text-right space-top" style={{'paddingRight': '10px'}}>
          <Icon icon="close" />
        </div>

        <div className="column-12 text-center">          
          <h2>This site uses cookies</h2>
        </div>

        <div className="column-12 text-center space-bottom">
          <h5>[Publisher] and our partners set cookies and collect information from your browser across the web to provide you with website content, deliver relevant advertising, and understand web audiences.</h5>

          <Button 
            type="submit" 
            value="Accept All Cookies" 
            classes={['btn-confirmation','btn-sm']} 
            onClick={event => {
              event.preventDefault();
              this.props.userAcceptedAllCookies();
            }}
          />         

          <span style={{'paddingRight': '5px','paddingLeft': '5px'}}></span>

          <Button 
            type="submit" 
            value="Full Vendor List" 
            classes={['btn-primary','btn-sm']} 
            onClick={event => {
              event.preventDefault();              
              this.modal.open();
              this.setState({selections:[]});
            }}
          />     
          <Modal ref={modal => this.modal = modal} height={600} width={800}>
            <ModalBody title="Consent By Company">       
              <p>Help us provide you with a better online experience! [Publisher] and our partners set cookies
              and collect information from your browser across the web to provide you with website content,
              deliver relevant advertising and understand web audiences.</p>
              <VendorTable                 
                companies={this.props.purposes!==undefined ? this.props.purposes.vendors : [{'name':'SteelHouse'},{'name':'The Trade Desk'}]} 
                purposes={this.props.purposes!==undefined ? this.props.purposes.purposes : ['SteelHouse','The Trade Desk']} 
                selections={this.state.selections}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                value="Save and Exit"
                classes={['btn-m','btn-red', 'pull-right']}                
                onClick={event => {
                  event.preventDefault()
                  this.getSelections(this.state.selections)
                  this.modal.close()
                }}
              />
            </ModalFooter>
          </Modal>

          <span style={{'paddingRight': '5px','paddingLeft': '5px'}}></span>

           <Button 
            type="submit" 
            value="Reject All Cookies" 
            classes={['btn-red','btn-sm']} 
            onClick={event => {
              event.preventDefault();
              this.props.setRejectCookie();
            }}
          />    
        </div>
                
      </div>
    );
  };
};

const mapDispatchToProps = { 
  setRejectCookie, 
  checkForExistingUserGDPRCookie,
  userAcceptedAllCookies,
  showPurposes,
  logChoices 
};

const mapStateToProps = ({ cookieReducer, selectionsReducer }) => {
  return { ...cookieReducer, ...selectionsReducer }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
