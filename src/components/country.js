const Country = (props) => {
  return (
    <div className="country-display" id={props.country.name.common}>
      <img
        className="country-display-flag"
        src={props.country.flags.png}
        alt="Flag"
      />
      <p>{props.country.name.common}</p>
      <div className="country-display-details">
        <div>
          <p>Population:</p>
          <p>{props.country.population}</p>
        </div>
        <div>
          <p>Region:</p>
          <p>{props.country.region}</p>
        </div>
        <div>
          <p>Capital:</p>
          <p>{props.country.capital}</p>
        </div>
      </div>
    </div>
  );
};

export default Country;
