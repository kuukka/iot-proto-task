import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';

const DeviceForm = ({data, setData, readOnly}) => {

  const onTextChange = (e) => {
    let form = {...data};

    form[e.target.name] = e.target.value

    setData(form);
  }

  const onCbChange = (e) => {
    let form = {...data};

    form[e.target.name] = e.target.checked

    setData(form);
  }

  if(readOnly) {
    return (
      <Row>
        <Col>          
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <p>{data.name}</p>            
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Device ID</Form.Label>
            <p>{data.deviceId}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sensors</Form.Label>
            <ul className='sensorList'>
              <li>Temperature: {data.sensorTemperature === true ? "yes": "no"}</li>
              <li>Humidity: {data.sensorHumiditiy === true ? "yes": "no"}</li>
              <li>Luminance: {data.sensorLuminance === true ? "yes": "no"}</li>
              <li>HeartBeat: {data.sensorHeartbeat === true ? "yes": "no"}</li>
              <li>Distance: {data.sensorDistance === true ? "yes": "no"}</li>
            </ul>
          </Form.Group>
        </Col>
      </Row>
    );
  }
  
  return (
    <Row>
      <Col>          
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            placeholder="First name.."
            value={data.name}
            onChange={onTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Device ID</Form.Label>
          <Form.Control
            name="deviceId"
            type="text"
            placeholder="Id.."
            value={data.deviceId}
            onChange={onTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sensors</Form.Label>
          <Form.Check 
            name="sensorTemperature"
            type="switch"
            id="temp-switch"
            label="Temperature"
            checked={data.sensorTemperature === true}
            onChange={onCbChange}
          />
          <Form.Check 
            name="sensorHumiditiy"
            type="switch"
            id="hum-switch"
            label="Humidity"
            checked={data.sensorHumiditiy === true}
            onChange={onCbChange}
          />
          <Form.Check 
            name="sensorLuminance"
            type="switch"
            id="lum-switch"
            label="Luminance"
            checked={data.sensorLuminance === true}
            onChange={onCbChange}
          />
          <Form.Check 
            name="sensorHeartbeat"
            type="switch"
            id="hb-switch"
            label="Heartbeat"
            checked={data.sensorHeartbeat === true}
            onChange={onCbChange}
          />
          <Form.Check 
            name="sensorDistance"
            type="switch"
            id="hb-switch"
            label="Distance"
            checked={data.sensorDistance === true}
            onChange={onCbChange}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default DeviceForm;
