import "./styles.css";
import Country from "./components/country";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

const theme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const [isDark, setDark] = useState(theme);
  const [error, setError] = useState("");

  function handleTheme() {
    if (isDark === "dark") {
      setDark("light");
      localStorage.setItem("theme", "light");
      document.querySelectorAll(".dark").forEach((item) => {
        item.classList.remove("dark");
        item.classList.add("light");
      });
      document.querySelectorAll(".darkOther").forEach((item) => {
        item.classList.remove("darkOther");
        item.classList.add("lightOther");
      });
    } else {
      setDark("dark");
      localStorage.setItem("theme", "dark");
      document.querySelectorAll(".light").forEach((item) => {
        item.classList.remove("light");
        item.classList.add("dark");
      });
      document.querySelectorAll(".lightOther").forEach((item) => {
        item.classList.remove("lightOther");
        item.classList.add("darkOther");
      });
    }
  }

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then(
        (data) => {
          setCountries(sortData(data));
          setData(sortData(data));
        },
        (error) => {
          setError(error);
        }
      );
  }, [setCountries]);

  function sortData(data) {
    return data.sort((a, b) => {
      const aName = a.name.common;
      const bName = b.name.common;
      return aName < bName ? -1 : aName > bName ? 1 : 0;
    });
  }

  function handleSearch(e) {
    if (e.target.value) {
      var temp = [...sortData(data)];
      const searched = temp.filter((item) =>
        item.name.common.toLowerCase().includes(e.target.value)
      );

      setCountries(searched);
    } else {
      setCountries(sortData(data));
    }
  }

  function handleFilter(e) {
    setCountries(sortData(data));
    if (e.target.value) {
      var temp = [...sortData(data)];
      const filtered = temp.filter((item) =>
        item.region.toLowerCase().includes(e.target.value)
      );
      console.log(filtered);
      if (filtered.length > 1) {
        setCountries(filtered);
      } else {
        console.log("no matches");
      }
    } else {
      setCountries(sortData(data));
    }
  }

  return (
    <div className={"App " + isDark}>
      <Navbar theme={isDark} handleTheme={handleTheme} />
      <div id='search-filter-container'>
        <div>
          <span>
            <i className='fa-solid fa-magnifying-glass'></i>
          </span>
          <input
            id='search-bar'
            type='search'
            placeholder='Search for a country...'
            className={isDark + "Other"}
            onChange={handleSearch}
          />
        </div>
        <select
          id='filter-bar'
          onChange={handleFilter}
          className={isDark + "Other"}
        >
          <option value=''>Filter by Region</option>
          <option value='africa'>Africa</option>
          <option value='america'>America</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
        </select>
      </div>
      <div id='countries-container' className={isDark}>
        {countries.map((item, key) => (
          <Link
            className='country-link'
            key={key}
            to={`/countries/${item.cca3}`}
            state={{ theme: isDark }}
          >
            <Country country={item} theme={isDark} />
          </Link>
        ))}
      </div>
    </div>
  );
}
