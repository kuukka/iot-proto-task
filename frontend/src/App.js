import './App.css';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Page from './Template/Page';

function App() {
  return (
    <>
      <Page>
        <Row>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
      </Page>      
    </>
  );
}

export default App;
