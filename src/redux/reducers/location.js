const initialState = {
  ufs: [],
  cities: [],
  selectedUf: "",
  selectedCity: "",
};

export const location = (state = initialState, action) => {
  switch (action.type) {
    case "GET_UFS":
      return {
        ...state,
        ufs: action.ufs,
      };
    case "GET_CITIES":
      return {
        ...state,
        cities: action.cities,
      };
    case "SET_UF":
      return {
        ...state,
        selectedUf: action.selectedUf,
      };
    case "SET_CITY":
      return {
        ...state,
        selectedCity: action.selectedCity,
      };
    default:
      return state;
  }
};
