import { Router, Routes, Route } from "react-router-dom";
import App from "./App";
import CountryDetails from "./components/countryDetails";

const Switch = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path={process.env.PUBLIC_URL + "/"} element={<App />} />
        <Route path='/countries/:i' element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default Switch;
