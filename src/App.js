import "./styles.css";
import Country from "./components/country";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(sortData(data));
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function sortData(data) {
    return data.sort((a, b) => {
      const aName = a.name.common;
      const bName = b.name.common;
      return aName < bName ? -1 : aName > bName ? 1 : 0;
    });
  }

  return (
    <div className="App">
      <div id="top"></div>
      <Navbar />
      <div id="search-filter-container">
        <input
          id="search-bar"
          type="search"
          placeholder="Search for a country..."
        />
        <select id="filter-bar">
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div id="countries-container">
        {countries.map((item, key) => (
          <Link
            className="country-link"
            key={key}
            to={`/countries/${item.cca3}`}
            state={{ cca3: item.cca3 }}
          >
            <Country country={item} />
          </Link>
        ))}
      </div>
      <div id="bottom"></div>
    </div>
  );
}
