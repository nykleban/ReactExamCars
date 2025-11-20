import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import CarFilters from "../components/CarFilters";
import CarList from "../components/CarList";
import { loadCarsFromAPI, clearAllCars } from "../features/cars/carsSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="mb-3">Каталог автомобілів</h1>

      {/* --- КНОПКИ ДЛЯ ЗАВАНТАЖЕННЯ АВТО З API + ОЧИСТКА --- */}
      <ButtonGroup className="mb-3 d-flex gap-5">
        <Button variant="primary" className="rounded-2" onClick={() => dispatch(loadCarsFromAPI("tesla"))}>
          Завантажити Tesla
        </Button>
        <Button variant="success" className="rounded-2" onClick={() => dispatch(loadCarsFromAPI("honda"))}>
          Завантажити Honda
        </Button>
        <Button variant="warning" className="rounded-2" onClick={() => dispatch(loadCarsFromAPI("toyota"))}>
          Завантажити Toyota
        </Button>
        <Button variant="dark" className="rounded-2" onClick={() => dispatch(loadCarsFromAPI("bmw"))}>
          Завантажити BMW
        </Button>
        <Button variant="danger" className="rounded-2" onClick={() => dispatch(clearAllCars())}>
          Очистити всі авто
        </Button>
      </ButtonGroup>

      <CarFilters />
      <CarList />
    </div>
  );
};

export default HomePage;
