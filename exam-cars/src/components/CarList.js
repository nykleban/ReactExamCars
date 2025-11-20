import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCar } from "../features/cars/carsSlice";

const applyFilters = (cars, filters) => {
  return cars.filter((car) => {
    if (
      filters.manufacturer &&
      !car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())
    ) {
      return false;
    }
    if (filters.year && String(car.year) !== String(filters.year)) {
      return false;
    }
    if (
      filters.color &&
      !car.color.toLowerCase().includes(filters.color.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.engineVolume &&
      Number(car.engineVolume) !== Number(filters.engineVolume)
    ) {
      return false;
    }
    if (filters.priceMin && car.price < Number(filters.priceMin)) {
      return false;
    }
    if (filters.priceMax && car.price > Number(filters.priceMax)) {
      return false;
    }
    return true;
  });
};

const CarList = () => {
  const cars = useSelector((state) => state.cars.list);
  const filters = useSelector((state) => state.cars.filters);
  const dispatch = useDispatch();

  const filteredCars = applyFilters(cars, filters);

  const handleDelete = (id) => {
    if (window.confirm("Видалити це авто?")) {
      dispatch(deleteCar(id));
    }
  };

  if (!filteredCars.length) {
    return <p>Немає автомобілів за вказаними параметрами.</p>;
  }

  return (
    <Row>
      {filteredCars.map((car) => (
        <Col md={4} className="mb-4" key={car.id}>
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
                <b>Об'єм:</b> {car.engineVolume} л
                <br />
                <b>Ціна:</b> {car.price} $
                <br />
              </Card.Text>
              <Button
                as={Link}
                to={`/cars/${car.id}`}
                variant="primary"
                size="sm"
                className="me-2"
              >
                Детальніше
              </Button>
              <Button
                as={Link}
                to={`/edit/${car.id}`}
                variant="warning"
                size="sm"
                className="me-2"
              >
                Редагувати
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(car.id)}
              >
                Видалити
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CarList;
