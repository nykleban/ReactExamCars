import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const loadCarsFromAPI = createAsyncThunk(
  "cars/loadCarsFromAPI",
  async (make) => {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`;
    const res = await fetch(url);
    const data = await res.json();

    const models = data.Results.slice(0, 12);
    // Можливі кольори
    const colors = ["black", "white", "red", "blue", "silver", "gray", "green"];

    // Можливі роки випуску
    const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

    // Можливі об'єми двигуна
    const volumes = [1.4, 1.6, 2.0, 2.5, 3.0];

    const withImages = models.map((m) => ({
      id: crypto.randomUUID(),
      name: m.Model_Name,
      manufacturer: m.Make_Name,

      year: years[Math.floor(Math.random() * years.length)],
      engineVolume: volumes[Math.floor(Math.random() * volumes.length)],
      price: 15000 + Math.floor(Math.random() * 45000),
      color: colors[Math.floor(Math.random() * colors.length)],

      description: "Автомобіль імпортований із відкритого API VPIC.",
      image: `https://source.unsplash.com/400x300/?${m.Model_Name},car`,
    }));

    return withImages;
  }
);

const initialState = {
  list: [
    {
      id: "1",
      name: "Model S",
      manufacturer: "Tesla",
      year: 2022,
      engineVolume: 0.0,
      price: 80000,
      color: "black",
      description: "Електричний седан преміум-класу.",
    },
    {
      id: "2",
      name: "Civic",
      manufacturer: "Honda",
      year: 2018,
      engineVolume: 1.8,
      price: 18000,
      color: "red",
      description: "Надійний міський автомобіль.",
    },
    {
      id: "3",
      name: "Camry",
      manufacturer: "Toyota",
      year: 2020,
      engineVolume: 2.5,
      price: 25000,
      color: "white",
      description: "Комфортний сімейний седан.",
    },
  ],
  filters: {
    manufacturer: "",
    year: "",
    color: "",
    engineVolume: "",
    priceMin: "",
    priceMax: "",
  },
  status: "idle",
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(car) {
        return {
          payload: {
            ...car,
            id: nanoid(),
          },
        };
      },
    },
    updateCar(state, action) {
      const { id, updatedCar } = action.payload;
      const index = state.list.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedCar };
      }
    },
    deleteCar(state, action) {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setCarsFromStorage(state, action) {
      state.list = action.payload;
    },
    clearAllCars(state) {
      state.list = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCarsFromAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCarsFromAPI.fulfilled, (state, action) => {
        state.status = "success";
        state.list.push(...action.payload);
      })
      .addCase(loadCarsFromAPI.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  addCar,
  updateCar,
  deleteCar,
  setFilters,
  resetFilters,
  setCarsFromStorage,
  clearAllCars,
} = carsSlice.actions;

export default carsSlice.reducer;