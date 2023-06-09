import { Routes, Route, Router } from "react-router-dom";
import App from "./App";
import CountryDetails from "./components/countryDetails";

const Switch = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/countries/:id' element={<CountryDetails />} />
    </Routes>
  );
};

export default Switch;
