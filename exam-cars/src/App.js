import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import store from "./store";
import Menu from "./components/Menu";
import HomePage from "./pages/HomePage";
import AddCarPage from "./pages/AddCarPage";
import EditCarPage from "./pages/EditCarPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { setCarsFromStorage } from "./features/cars/carsSlice";

const AppContent = () => {
  const cars = useSelector((state) => state.cars.list);
  const dispatch = useDispatch();

  // завантаження з localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cars");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) dispatch(setCarsFromStorage(parsed));
      } catch (e) {
        console.error("Помилка читання cars з localStorage", e);
      }
    }
  }, [dispatch]);

  // збереження в localStorage
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  return (
    <>
      <Menu />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddCarPage />} />
          <Route path="/edit/:id" element={<EditCarPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;