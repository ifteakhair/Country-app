import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from 'reactstrap';
import { setCountries, setCurrentPage } from '../../actions/actions';
import { Link } from 'react-router-dom';
import './list.css';
import ReactPaginate from 'react-paginate';
import countryList from 'country-list';


function useCountryData() {
  const dispatch = useDispatch();
  const { countries, totalPages, currentPage } = useSelector(
    (state) => state.countries
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [prevPage, setPrevPage] = useState(0); 
  useEffect(() => {
    async function fetchCountries(page, name) {
      try {
        const response = await axios.get(
          `http://dev.abroadinquiry.com:5001/countries`,
          {
            params: {
              page: page + 1,
              name,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    }

    async function fetchData() {
      const data = await fetchCountries(prevPage, searchTerm); 
      if (data) {
        dispatch(setCountries(data.data, data.totalPages));
      }
    }

    fetchData();
  }, [prevPage, searchTerm, dispatch]);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handlePageChange = (selectedPage) => {
    setPrevPage(selectedPage.selected); 
    dispatch(setCurrentPage(selectedPage.selected));
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredCountries,
    totalPages,
    currentPage,
    handlePageChange,
  };
}

function CountryList() {
  const {
    searchTerm,
    setSearchTerm,
    filteredCountries,
    totalPages,
    handlePageChange,
  } = useCountryData();

 
 
 return (
    <div className='background'>
      <div className='bodypage'>
        <div
          className='header'
          style={{
            padding: '20px  0px',
            backgroundColor: 'black',
            width: '100%',
            color: 'white',
          }}
        >
          <h1 className='text-center'>Country List</h1>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search by country name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Container>
        <div className='main-content'>
          <div className='grid-container pt-2'>
            {filteredCountries.map((country) => {
              const countryCode = countryList.getCode(country.name);

              return (
                <div className='grid-item' key={country.id}>
                  <Link
                    to={`/country/${country.id}/${encodeURIComponent(
                      country.name
                    )}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className='text-center'
                      style={{
                        height: '200px',
                        width: '300px',
                        backgroundColor: 'white',
                        color: 'red',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                       
                        
                      }}
                    >
                      <h4>Country: {country.name}</h4>
                      <p>Capital: {country.capital}</p>
                      <p><img src={`https://www.countryflagicons.com/SHINY/64/${countryCode}.png`} alt=''/></p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        </Container>
      </div>

      <ReactPaginate
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default CountryList;
