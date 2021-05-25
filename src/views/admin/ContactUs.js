import {
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CCol
  } from '@coreui/react'
    
  const ContacttUs = () => {
    return (
        <CCard>
          <CCardHeader>
            Contact us
            
          </CCardHeader>
          <CCardBody>
            <CRow>
            <CCol>
             <h1>Email: </h1>
             </CCol>
            </CRow>
            <CRow style={{marginLeft:"10px"}}><h3>info@twominds.co.in</h3>
            </CRow>
            <br /><br /><br />
             <CRow>
            <CCol>
             <h1>Ph no:</h1>
             </CCol>
            </CRow>
            <CRow style={{marginLeft:"10px"}}><h3>+011 4019 6231</h3>
            </CRow>
          </CCardBody>
        </CCard>
    )
  }
  
  export default ContacttUs
  