import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/esm/Nav';
import Page from '../Template/Page';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { useParams } from "react-router-dom";
import BarChart from '../Components/BarChart';
import LineChart from '../Components/LineChart';
import MultiaxisLineChart from '../Components/MultiaxisLineChart';
import Api from '../utils/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

const Devices = () => {
    const [devs, setDevices] = useState([]);
    const [patients, setPatients] = useState([]);
    const [readings, setReadings] = useState(null);
    const params = useParams();

    const selPatientId = params.device || "new";
    const selPatient = patients.reduce((pre, cur) => cur._id === selPatientId ? cur : pre, {deviceId: null });
    const selPatientDevice = devs.reduce((pre, cur) => cur._id === selPatient.deviceId ? cur : pre, {});

    // On mount 
    useEffect(() => {        

        // Load device data
        Api.get('/api/devices')
        .then(data=> data.json())
        .then(json => setDevices(json));

        // Load patient info
        Api.get('/api/patients')
        .then(data=> data.json())
        .then(json => setPatients(json));

        // const refreshId = setInterval(() => {        
        //     Api.get('/api/readings?name=4177955E&limit=50')
        //     .then(data => data.json())
        //     .then(json => {
        //         console.log("We are annyoing", json);
        //         setReadings(json);
        //     });
        // },1000)
        
        // On unmount
        // return () => clearInterval(refreshId);
    }, []);

    useEffect(() => {
        console.log("Get them readings", selPatientDevice)
        if(selPatientDevice.deviceId != null) {
            Api.get('/api/readings?name='+selPatientDevice.deviceId+'&limit=50')
            .then(data=> data.json())
            .then(json => setReadings(json));
        }
    }, [selPatientDevice])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Device temperatures',
          },
        },
    };

    const sensorTypes = [
        {key: "sensorHeartbeat", dbKey: "heartbeat", title: "Heartbeat", border:"rgb(255, 99, 132)", bg: "rgba(255, 99, 132, 0.5)"},
        {key: "sensorLuminance", dbKey: "light", title: "Luminance", border:"rgb(228,154,27)", bg: "rgba(228,154,27, 0.5)"},
        {key: "sensorMoisture", dbKey: "humidity", title: "Humidity", border:"rgb(152,23,216)", bg: "rgba(152,23,216, 0.5)"},
        {key: "sensorTemperature", dbKey: "temperature", title: "Temperature", border:"rgb(20,66,174)", bg: "rgba(20,66,174)"},
        {key: "sensorDistance", dbKey: "distance", title: "Distance", border:"rgb(51,174,20)", bg: "rgba(51,174,20, 0.5)"},
    ];

    let charts = [];
    sensorTypes.forEach( sensorType => {
        if(readings && readings.length > 0 && selPatientDevice[sensorType.key] === true) {
            const data = {
                labels: readings.map(e => {
                    const dt = new Date(e.timestamp);
                    const timeStr = `${dt.getHours()}.${dt.getMinutes()}`
                    return timeStr
                }),
                datasets: [
                    {
                        label: sensorType.title,
                        data: readings.map(e => e[sensorType.dbKey]),
                        borderColor: sensorType.border, //'rgb(255, 99, 132)',
                        backgroundColor: sensorType.bg,//'rgba(255, 99, 132, 0.5)',
                    }
                ]
            }; 

            charts.push(
                <LineChart 
                    key={"chart-"+sensorType.key}
                    title={'Chart for ' + sensorType.title}
                    options={options}
                    data={data}
                />
            )
        }
    });


    if(charts.lengt === 0) {
        charts.push(<div>No data on selected sensors</div>);
    }

// console.log("patients", patients)
// console.log("selected patient", selPatient)
// console.log("patient device", selPatientDevice);
// console.log("readings", readings);

    return (
        <Page>
            <Row>
                <Col sm={2} className="p-3 pt-0 text-white bg-dark d-flex flex-column flex-shrink device-menu">                    
                    <Nav variant='pills' className='flex-column mt-3 me-2' activeKey={params.device}>
                        {patients.map( dev => {
                            return (
                                <Nav.Item key={"device-nav-"+dev._id} className='mb-2'>
                                    <LinkContainer to={'/readings/'+dev._id}>
                                        <Nav.Link className='text-white'>
                                            <FontAwesomeIcon icon={faMicrochip} className='me-3' />
                                            {dev.firstName.substr(0,1).toUpperCase()} {dev.lastName}
                                        </Nav.Link>
                                    </LinkContainer>                                     
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col>
                    { !params.device && 
                        <div> Select patient from the side menu</div>
                    }
                    {readings && 
                        <Container fluid>
                            <Row>
                                {charts.map( (c, i) => 
                                    <Col key={i} sm={6}>{c}</Col>)
                                }
                            </Row>
                        </Container>
                    }
                </Col>
            </Row>    
        </Page>
    )
}

export default Devices;