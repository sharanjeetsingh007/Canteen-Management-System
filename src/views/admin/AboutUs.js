import {
    CRow,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'
    
  const AboutUs = () => {
    return (
        <CCard>
          <CCardHeader>
            About us
            
          </CCardHeader>
          <CCardBody>
            
            <CRow><img class="twomindstimage" src="https://twominds.co.in/img/tmt_logo.png" alt="image" style={{marginLeft:'16px'}} />
            </CRow>
            <br /><br />
            <CRow>
              <h6>Two Minds Technology was established in 2010 & has grown exponentially over the years. It is a potential gold mine for exploring new and useful ideas to augment competence in innovation and professionals Two minds technology owns, manages and runs one the biggest Social networking & Learning platform for young engineers & engineering students supported by two main product lines:
              </h6>
            </CRow>
          </CCardBody>
        </CCard>
    )
  }
  
  export default AboutUs
  