import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import CarForm from "../components/CarForm";
import { updateCar } from "../features/cars/carsSlice";

const EditCarPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const car = useSelector((state) =>
    state.cars.list.find((c) => c.id === id)
  );

  if (!car) {
    return <p>Автомобіль не знайдено.</p>;
  }

  const handleUpdate = (carData) => {
    dispatch(updateCar({ id, updatedCar: carData }));
    navigate("/");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Редагувати автомобіль</Card.Title>
        <CarForm initialData={car} onSubmit={handleUpdate} />
      </Card.Body>
    </Card>
  );
};

export default EditCarPage;
