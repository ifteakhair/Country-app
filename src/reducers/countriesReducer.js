const initialState = {
    countries: [],
    totalPages: 0,
    currentPage: 0,
  };
  
  const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COUNTRIES':
        return {
          ...state,
          countries: action.payload.countries,
          totalPages: action.payload.totalPages,
        };
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          currentPage: action.payload.currentPage,
        };
      default:
        return state;
    }
  };
  
  export default countriesReducer;
  