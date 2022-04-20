import Page from '../Template/Page';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/esm/Nav';
import { useState } from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBedPulse } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";

const Patients = () => {
    const params = useParams();
    const devices = [
        {id: 1, "name": "Test 1", type: "temp"},
        {id: 2, "name": "Test 2", type: "temp"},
        {id: 3, "name": "Test 3", type: "temp"},
    ];
    const selPatient = params.patient || "new";
console.log("patient", params.patient, selPatient)
    return (
        <Page>
            <Row>
                <Col sm={2} className="p-3 pt-0 text-white bg-dark d-flex flex-column flex-shrink device-menu">                    
                    <Nav variant='pills' className='flex-column mt-3 me-2' activeKey={selPatient} defaultActiveKey="new">
                    <Nav.Item key={"device-nav-new"} className='mb-2'>
                        <LinkContainer to={'/patients/new'}>
                            <Nav.Link eventKey="new" className='text-white'>
                                <FontAwesomeIcon icon={faBedPulse} className='me-3' />
                                New patient
                            </Nav.Link>
                        </LinkContainer>                                     
                    </Nav.Item>
                                            
                        {devices.map( dev => {
                            return (
                                <Nav.Item key={"device-nav-"+dev.id} className='mb-2'>
                                    <LinkContainer to={'/patients/'+dev.id}>
                                        <Nav.Link eventKey={dev.id} className='text-white'>
                                            <FontAwesomeIcon icon={faBedPulse} className='me-3' />
                                            {dev.name}
                                        </Nav.Link>
                                    </LinkContainer>                                     
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col>
                    
                    { !params.device && 
                        <div> Select device from the side menu</div>
                    }
                </Col>
            </Row>    
        </Page>
    )
}

export default Patients;