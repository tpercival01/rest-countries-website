import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const CountryDetails = () => {
  const location = useLocation();
  const { cca3 } = location.state;

  const navigate = useNavigate();
  const [country, setCountry] = useState();
  const [border, hasBorder] = useState(false);
  const [borderCountries, setBorderCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const getCountryData = async () => {
      const resp = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
      const json = await resp.json();
      setCountry(json[0]);
    };
    getCountryData();

    /*fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("logged", data[0]);
        setCountry(data[0]);
      });

    // checking if object has any border countries, prevent rendering an element if not

    if (country.borders) {
      hasBorder(true);
      setBorderCountries(country.borders);
    }

    // quick loop to turn languages object into array to map over in the render

    let tempLang = [];
    for (const item in country.languages) {
      tempLang.push(country.languages[item]);
    }
    setLanguages(tempLang);*/

    console.log("wtf", country);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleBorder = (e) => {
    console.log(e.target.id);
  };

  if (country) {
    return (
      <div id="country-details">
        <div id="top"></div>
        <Navbar />
        <div id="back-button" onClick={handleBack}>
          Back
        </div>
        <div id="details-container">
          <span id="details-page-flag">
            <img src={country.flags.png} alt="country flag" />
          </span>
          <div id="details-page-details">
            <p>{country.name.common}</p>
            <div id="details-left">
              <p>
                <span>Native Name:</span>
                {
                  country.name.nativeName[
                    Object.keys(country.name.nativeName)[0]
                  ].common
                }
              </p>
              <p>
                <span>Population:</span>
                {country.population}
              </p>
              <p>
                <span>Region:</span>
                {country.region}
              </p>
              <p>
                <span>Sub Region:</span>
                {country.subregion}
              </p>
              <p>
                <span>Capital:</span>
                {country.capital[0]}
              </p>
            </div>
            <div id="details-right">
              <p>
                <span>Top Level Domain:</span>
                {country.tld[0]}
              </p>
              <p>
                <span>Currencies:</span>
                {country.currencies[Object.keys(country.currencies)[0]].name}
              </p>
              <div>
                <span>Languages:</span>
                {languages.map((item, key) => (
                  <p key={key} className="language">
                    {item},
                  </p>
                ))}
              </div>
            </div>
            {border && (
              <div id="border-countries">
                <p>Border Countries: </p>
                {borderCountries.map((item, key) => (
                  <div
                    className="border-country"
                    key={key}
                    onClick={handleBorder}
                    id={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div id="bottom"></div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
};

export default CountryDetails;
