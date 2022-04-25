import Page from '../Template/Page';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/esm/Nav';
import Button from 'react-bootstrap/esm/Button';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import DeviceForm from '../Components/DeviceForm';
import { useEffect, useState, useRef } from 'react';
import Api from '../utils/Api';
import useToken from '../Auth/useToken';

const DeviceSettings = () => {
    const params = useParams();
    const [devices, setDevices] = useState([]);
    const [form, setForm] = useState({
        _id: null,
        name: "",
        deviceId: "",
        sensorLuminance: false,
        sensorTemperature: false,
        sensorMoisture: false,
        sensorHeartbeat: false,
        sensorDistance: false
    });

    const selDevice = params.device || "new";
    const {token} = useToken();
    let devsUpdated = useRef(0);

    const device = devices.reduce( (prev, cur) => 
        cur._id === selDevice ? cur : prev , form);

    const getDevices = () =>
     Api.get('/api/devices')
        .then(data => data.json())
        .then(json => {
            setDevices(json);            
            devsUpdated.current++;
        })
        
    useEffect( () => setForm(device), [device]);
    useEffect( () => getDevices(), [devsUpdated]);
    const handleNew = () => {
        setForm({
            _id: null,
            name: "",
            deviceId: "",
            sensorLuminance: false,
            sensorTemperature: false,
            sensorMoisture: false,
            sensorHeartbeat: false,
            sensorDistance: false
        });
    }
    const handleSaveDevice = () => {
        if(form.name === "" || form.deviceId === "")  {
            alert("Please fill all the fields");
            return;
        }
        if(form._id) {
            Api.put(`/api/devices/${form._id}`, 
                JSON.stringify(form),
                {"x-access-token": `${token}`}
            ).then( () => getDevices());
        } else {
            Api.post("/api/devices", 
                JSON.stringify(form),
                {"x-access-token": `${token}`}
            ).then( () => getDevices());           
        }
        
    }

    return (
        <Page>
            <Row>
                <Col sm={2} className="p-3 pt-0 text-white bg-dark d-flex flex-column flex-shrink device-menu">                    
                    <Nav variant='pills' className='flex-column mt-3 me-2' activeKey={selDevice} defaultActiveKey="new">
                    <Nav.Item key={"device-nav-new"} className='mb-2'>
                        <LinkContainer to={'/settings/devices/new'} onClick={handleNew}>
                            <Nav.Link eventKey="new" className='text-white'>
                                <FontAwesomeIcon icon={faMicrochip} className='me-3' />
                                New device
                            </Nav.Link>
                        </LinkContainer>                                     
                    </Nav.Item>
                                            
                        {devices.map( dev => {
                            return (
                                <Nav.Item key={"device-nav-"+dev._id} className='mb-2'>
                                    <LinkContainer to={'/settings/devices/'+dev._id}>
                                        <Nav.Link eventKey={dev._id} className='text-white'>
                                            <FontAwesomeIcon icon={faMicrochip} className='me-3' />
                                            {dev.name}
                                        </Nav.Link>
                                    </LinkContainer>                                     
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col sm={4}>
                    <DeviceForm data={form} setData={setForm}/>
                    <Button className='mt-4' variant="primary" onClick={handleSaveDevice}>
                        Save
                    </Button>                 
                </Col>
            </Row>    
        </Page>
    )
}

export default DeviceSettings;