import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './details.css'
import countryList from 'country-list'; 



function CountryDetails() {
  const { countryId, countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    async function fetchCountryDetails() {
      try {
        const response = await axios.get(`http://dev.abroadinquiry.com:5001/get-a-country-details`, {
          params: {
            cid: countryId,
            cname: countryName,
          },
        });

        setCountryDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    }

    fetchCountryDetails();
  }, [countryId, countryName]);

  if (!countryDetails) {
    return <div>Loading...</div>;
  }

  const countryCode = countryList.getCode(countryDetails.name);
  console.log(countryCode);

  
  const goBack = () => {
    window.history.back(); 
  };

  return (
    <div className='main pt-5'>
      <div className='details text-center pt-5'>
        
        <h1>{countryDetails.name}</h1>
        <p>Population: {countryDetails.population}</p>
        <p>Capital: {countryDetails.capital}</p>
        <p>Currency: {countryDetails.currency}</p>
        <div className="pr-3 pl-3">
          <p>Description: {countryDetails.description}</p>
        </div>
        <img src={`https://www.countryflagicons.com/SHINY/64/${countryCode}.png`} alt=''/>
        <p><button type="button" className="btn btn btn-dark mybtn mt-3" onClick={goBack}>Go Back</button> </p>
      </div>
    </div>
  );
}

export default CountryDetails

