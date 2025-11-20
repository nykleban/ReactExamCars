import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { setFilters, resetFilters } from "../features/cars/carsSlice";

const CarFilters = () => {
  const filters = useSelector((state) => state.cars.filters);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Фільтри</Card.Title>
        <Form>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Виробник</Form.Label>
                <Form.Control
                  name="manufacturer"
                  value={filters.manufacturer}
                  onChange={handleChange}
                  placeholder="Tesla, Honda..."
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Рік випуску</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={filters.year}
                  onChange={handleChange}
                  placeholder="2020"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Колір</Form.Label>
                <Form.Control
                  name="color"
                  value={filters.color}
                  onChange={handleChange}
                  placeholder="black, red..."
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Об'єм двигуна (л)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name="engineVolume"
                  value={filters.engineVolume}
                  onChange={handleChange}
                  placeholder="1.6"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Ціна від</Form.Label>
                <Form.Control
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Ціна до</Form.Label>
                <Form.Control
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="secondary" onClick={handleReset}>
            Скинути фільтри
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CarFilters;