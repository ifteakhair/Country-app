
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CountryList from './components/CountryList/CountryList';
import CountryDetails from './components/CountryDetail/CountryDetails';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Routes>
          <Route path='/'  element={<CountryList/>}/>
          <Route path="/country/:countryId/:countryName" element={<CountryDetails/>} />
        
      </Routes>
    </Provider>
  );
}

export default App;
