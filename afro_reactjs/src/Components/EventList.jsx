import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const EventList = ({ events }) => {
  if (!events?.length) return <p>Aucun événement associé.</p>;

  return (
    <Row>
      {events.map((event) => (
        <Col md={6} key={event.id}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{event.libelle}</Card.Title>
              <Card.Text>
                <FontAwesomeIcon icon={faCalendar} /> {event.date}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faLocationDot} /> {event.lieu}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default EventList;
