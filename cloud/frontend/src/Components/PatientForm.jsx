import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';

const PatientForm = ({data, setData, devices}) => {

  const onTextChange = (e) => {
    let form = {...data};

    form[e.target.name] = e.target.value

    setData(form);
  }

  const onSelectChange = (e) => {
    let form = {...data};
    
    form[e.target.name] = e.target.value
    
    setData(form);
  }

  return (
    <Row>
      <Col>          
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control 
            name="firstName"
            type="text"
            placeholder="First name.."
            value={data.firstName}
            onChange={onTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name name</Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Last name.."
            value={data.lastName}
            onChange={onTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Room nr</Form.Label>
          <Form.Control
            name="roomNr"
            type="text"
            placeholder="Room nr.."
            value={data.roomNr}
            onChange={onTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Device</Form.Label>
          <Form.Select name="deviceId" onChange={onSelectChange} value={data.deviceId}>
            <option value="0"> Select device</option>
            {devices.map( (dev) => (
              <option key={dev._id} value={dev._id}>{dev.name}</option>
            ))}
          </Form.Select>            
        </Form.Group>
      </Col>
    </Row>
  );
};

export default PatientForm;
