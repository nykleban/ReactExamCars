import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    <h2>Сторінку не знайдено</h2>
    <Link to="/">Повернутися на головну</Link>
  </div>
);

export default NotFoundPage;
