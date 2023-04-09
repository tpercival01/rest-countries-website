import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";

const CountryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [CCA3, setCCA3] = useState(id);

  const theme = useLocation().state.theme;
  const [isDark, setDark] = useState(theme);

  const [country, setCountry] = useState();
  const [border, hasBorder] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${CCA3}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data[0]);
        setLanguages(data[0].languages);
        data[0].borders ? hasBorder(true) : hasBorder(false);
        data[0].borders
          ? setBorderCountries(data[0].borders)
          : setBorderCountries([]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [CCA3, setCCA3]);

  function handleBorder(e) {
    setCCA3(e.target.id);
  }

  function handleBack() {
    navigate("/", { state: isDark });
  }

  function handleTheme() {
    if (isDark === "dark") {
      setDark("light");
    } else {
      setDark("dark");
    }
  }

  if (country) {
    return (
      <div id='country-details' className={isDark}>
        <Navbar theme={isDark} handleTheme={handleTheme} />
        <div id='back-button' className={isDark + "Other"} onClick={handleBack}>
          Back
        </div>
        <div id='details-container'>
          <span id='details-page-flag'>
            <img src={country.flags.png} alt='country flag' />
          </span>
          <div id='details-page-details'>
            <p>{country.name.common}</p>
            <div id='details-left'>
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
            <div id='details-right'>
              <p>
                <span>Top Level Domain:</span>
                {!!country.tld ? country.tld[0] : " "}
              </p>
              <p>
                <span>Currencies:</span>
                {country.currencies[Object.keys(country.currencies)[0]].name}
              </p>
              <div>
                <span>Languages:</span>
                {Object.keys(languages).map((item, key) => (
                  <p key={key} className='language'>
                    {languages[item]},
                  </p>
                ))}
              </div>
            </div>
            {border && (
              <div id='border-countries'>
                <p>Border Countries: </p>
                {borderCountries.map((item, key) => (
                  <div
                    className={"border-country " + isDark + "Other"}
                    id={item}
                    key={key}
                    onClick={handleBorder}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
};

export default CountryDetails;
