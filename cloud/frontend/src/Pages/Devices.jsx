import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/esm/Nav';
import Page from '../Template/Page';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { useParams } from "react-router-dom";
import BarChart from '../Components/BarChart';
import LineChart from '../Components/LineChart';
import Api from '../utils/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

const Devices = () => {
    const tempsLoaded = 1; // For use effect
    const [temps, setTemps] = useState([]);
    const [devs, setDevices] = useState([]);

    useEffect(() => {
        Api.get('/api/temperature')
        .then(data => data.json())
        .then(json => {
            let grouped = {};
            let devices = [];
            
            json.forEach( (item) => {
                const key = item.deviceName;

                if(!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push({
                    date: item.date, 
                    value: parseFloat(item.value, 10)
                });                
            })
            console.log(grouped);
            
            let devId = 4;
            devices = Object.keys(grouped).map( d => ({name: d, id: devId++, type: "temp"}));
            
            setTemps(grouped);
            setDevices(devices);            
        })
    }, [tempsLoaded]);
    const params = useParams();

    // Todo: get real dvices from ..
    const devices = [
        {id: 1, "name": "Test 1", type: "temp"},
        {id: 2, "name": "Test 2", type: "temp"},
        {id: 3, "name": "Test 3", type: "temp"},
    ];

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Inside',
                data: labels.map(() => Math.floor(Math.random() * (100 - 0 + 1) + 0)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Outside',
                data: labels.map(() => Math.floor(Math.random() * (100 - 0 + 1) + 0)),
                borderColor: 'rgb(53, 162, 235)',

                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

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

    let dataReal;
    const devKey = devs.reduce( (prev, cur) => cur.id === parseInt(params.device, 10) ? cur.name : prev, null);
    
    if(devKey !== null) {
        console.log()
        
        dataReal = {
            labels: temps[devKey].map((e) => e.date),
            datasets: [
                {
                    label: 'Inside',
                    data: temps[devKey].map((e) => e.value),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        };        
    }

    return (
        <Page>
            <Row>
                <Col sm={2} className="p-3 pt-0 text-white bg-dark d-flex flex-column flex-shrink device-menu">                    
                    <Nav variant='pills' className='flex-column mt-3 me-2' activeKey={params.device}>
                        {devices.map( dev => {
                            return (
                                <Nav.Item key={"device-nav-"+dev.id} className='mb-2'>
                                    <LinkContainer to={'/devices/'+dev.id}>
                                        <Nav.Link className='text-white'>
                                            <FontAwesomeIcon icon={faMicrochip} className='me-3' />
                                            {dev.name}
                                        </Nav.Link>
                                    </LinkContainer>                                     
                                </Nav.Item>
                            )
                        })}
                        {devs.map( dev => {
                            return (
                                <Nav.Item key={"device-nav-"+dev.id} className='mb-2'>
                                    <LinkContainer to={'/devices/'+dev.id}>
                                        <Nav.Link className='text-white'>
                                            <FontAwesomeIcon icon={faMicrochip} className='me-3' />
                                            {dev.name}
                                        </Nav.Link>
                                    </LinkContainer>                                     
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col>
                    { ["1","2"].includes(params.device) && 
                        <BarChart title={'Device temperatures'} options={options} data={data}/>
                    }
                    { ["3"].includes(params.device) && 
                        <LineChart title={'Device temperatures'} options={options} data={data}/>
                    }
                    {devKey && !["1", "2", "3"].includes(params.device) && 
                        <BarChart title={'Device temperatures'} options={options} data={dataReal}/>
                    }
                    { !params.device && 
                        <div> Select device from the side menu</div>
                    }
                </Col>
            </Row>    
        </Page>
    )
}

export default Devices;