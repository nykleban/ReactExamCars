import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const CarDetailsPage = () => {
  const { id } = useParams();
  const car = useSelector((state) =>
    state.cars.list.find((c) => c.id === id)
  );

  if (!car) {
    return <p>Автомобіль не знайдено.</p>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {car.name} ({car.year})
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {car.manufacturer}
        </Card.Subtitle>
        <Card.Text>
          <b>Колір:</b> {car.color}
          <br />
          <b>Об'єм двигуна:</b> {car.engineVolume} л
          <br />
          <b>Ціна:</b> {car.price} $
          <br />
          <b>Опис:</b> {car.description}
        </Card.Text>
        <Button as={Link} to="/" variant="secondary">
          Назад
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CarDetailsPage;
