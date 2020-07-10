export const getUfs = (ufs) => ({
  type: "GET_UFS",
  ufs,
});

export const getCities = (cities) => ({
  type: "GET_CITIES",
  cities,
});

export const setUf = (selectedUf) => ({
  type: "SET_UF",
  selectedUf,
});

export const setCity = (selectedCity) => ({
  type: "SET_CITY",
  selectedCity,
});
