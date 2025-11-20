import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import CarForm from "../components/CarForm";
import { addCar } from "../features/cars/carsSlice";

const AddCarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (carData) => {
    dispatch(addCar(carData));
    navigate("/");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Додати автомобіль</Card.Title>
        <CarForm onSubmit={handleAdd} />
      </Card.Body>
    </Card>
  );
};

export default AddCarPage;