import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PaymentSuccessPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Payment Successful!</Card.Title>
              <Card.Text>
                Thank you for your purchase. Your payment has been successfully processed.
              </Card.Text>
              <Button variant="primary" href="/">
                Go to Homepage
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;
