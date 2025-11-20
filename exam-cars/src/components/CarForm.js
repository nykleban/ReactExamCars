import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";

const CarForm = ({ initialData, onSubmit }) => {
  const [car, setCar] = useState(
    initialData || {
      name: "",
      manufacturer: "",
      year: "",
      engineVolume: "",
      price: "",
      color: "",
      description: "",
    }
  );

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...car,
      year: Number(car.year),
      engineVolume: Number(car.engineVolume),
      price: Number(car.price),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Назва</Form.Label>
        <Form.Control
          ref={nameInputRef}
          name="name"
          value={car.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Виробник</Form.Label>
        <Form.Control
          name="manufacturer"
          value={car.manufacturer}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Рік випуску</Form.Label>
        <Form.Control
          type="number"
          name="year"
          value={car.year}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Об'єм двигуна (л)</Form.Label>
        <Form.Control
          type="number"
          step="0.1"
          name="engineVolume"
          value={car.engineVolume}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Ціна ($)</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={car.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Колір</Form.Label>
        <Form.Control
          name="color"
          value={car.color}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Опис</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={car.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="success">
        Зберегти
      </Button>
    </Form>
  );
};

export default CarForm;