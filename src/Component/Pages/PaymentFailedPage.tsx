import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PaymentFailedPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-danger">Payment Failed</Card.Title>
              <Card.Text>
                Unfortunately, your payment could not be processed. Please try again or contact support.
              </Card.Text>
              <Button variant="primary" href="/">
                Go to Homepage
              </Button>
              <Button variant="danger" href="/checkout" className="ml-2">
                Retry Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentFailedPage;
