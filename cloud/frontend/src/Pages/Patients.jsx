import Page from '../Template/Page';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/esm/Nav';
import Button from 'react-bootstrap/esm/Button';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBedPulse } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import PatientForm  from '../Components/PatientForm';
import DeviceForm from '../Components/DeviceForm';
import { useEffect, useState, useRef } from 'react';
import useToken from '../Auth/useToken';
import Api from '../utils/Api';

const Patients = () => {
    const params = useParams();
    const [patients, setPatients] = useState([]);
    const [devices, setDevices] = useState([]);
    const [form, setForm] = useState({
        _id: null,
        firstName: "",
        lastName: "",
        roomNr: 0,
        deviceId: ""
    });
    
    const selPatient = params.patient || "new";
    const {token} = useToken();
    let patsUpdated = useRef(0);

    const patient = patients.reduce( (prev, cur) => 
        cur._id === selPatient ? cur : prev , form);

    const device = devices.reduce( (prev, cur) => 
        cur._id === form.deviceId ? cur : prev , null);
    
    const getPatients = () =>
     Api.get('/api/patients')
        .then(data => data.json())
        .then(json => {
            setPatients(json);            
            patsUpdated.current++;
        })

    const getDevices = () =>
        Api.get('/api/devices')
           .then(data => data.json())
           .then(json => {
               setDevices(json);            
           })

    useEffect( () => setForm(patient), [patient]);
    useEffect( () => getPatients(), [patsUpdated]);
    useEffect( () => getDevices(), []);

    const handleNew = () => {
        setForm({
            _id: null,
            firstName: "",
            lastName: "",
            roomNr: 0,
            deviceId: ""
        })
    };
    const handleSavePatient = () => {
        
        if(form.firstName === "" || form.lastName === "" || form.roomNr === "")  {
            alert("Please fill all the fields");
            return;
        }
        if(form._id) {
            Api.put(`/api/patients/${form._id}`, 
                JSON.stringify(form),
                {"x-access-token": `${token}`}
            ).then( resp => {
                getPatients();
            })            
        } else {
            Api.post("/api/patients", 
                JSON.stringify(form),
                {"x-access-token": `${token}`}
            ).then( resp => {
                getPatients();
            })            
        }
        
    }

    return (
        <Page>
            <Row>
                <Col sm={2} className="p-3 pt-0 text-white bg-dark d-flex flex-column flex-shrink device-menu">
                    <Nav variant='pills' className='flex-column mt-3 me-2' activeKey={selPatient} defaultActiveKey="new">
                    <Nav.Item key={"patient-nav-new"} className='mb-2'>
                        <LinkContainer to={'/settings/patients/new'}>
                            <Nav.Link eventKey="new" className='text-white' onClick={handleNew}>
                                <FontAwesomeIcon icon={faBedPulse} className='me-3' />
                                New patient
                            </Nav.Link>
                        </LinkContainer>                                     
                    </Nav.Item>
                                            
                        {patients.map( pat => {
                            const first = pat.firstName?.substr(0, 1);
                            return (
                                <Nav.Item key={"patient-nav-"+pat._id} className='mb-2'>
                                    <LinkContainer to={'/settings/patients/'+pat._id}>
                                        <Nav.Link eventKey={pat.id} className='text-white'>
                                            <FontAwesomeIcon icon={faBedPulse} className='me-3' />
                                            {`${first}. ${pat.lastName}`}
                                        </Nav.Link>
                                    </LinkContainer>                                     
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col sm={4}>
                    <PatientForm data={form} setData={setForm} devices={devices} />
                    <Button className='mt-4' variant="primary" onClick={handleSavePatient}>
                        Save
                    </Button>     
                    
                </Col>
                <Col sm={4}>
                    {device && 
                        <DeviceForm data={device} readOnly/>
                    }                    
                </Col>
            </Row>    
        </Page>
    )
}

export default Patients;