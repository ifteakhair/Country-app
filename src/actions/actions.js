
export const setCountries = (countries, totalPages) => ({
    type: 'SET_COUNTRIES',
    payload: {
      countries,
      totalPages,
    },
  });
  
  export const setCurrentPage = currentPage => ({
    type: 'SET_CURRENT_PAGE',
    payload: {
      currentPage,
    },
  });
  