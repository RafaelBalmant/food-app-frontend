import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { validateMessages } from "../../helpers/messages";
import {
  FormContainer,
  FlexForm,
  StyledFormControl,
  DefaultButton,
} from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function EstablishmentForm() {
  // material-ui
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [telephone, setTelephone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const classes = useStyles();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleTelephoneChange = (event) => {
    setTelephone(event.target.value);
  };

  const handleWhatsappChange = (event) => {
    setWhatsapp(event.target.value);
  };

  // react-hook-form
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  //console.log(errors);

  const state = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const ufInitials = response?.data.map((uf) => uf.sigla);

        return dispatch({
          type: "GET_UFS",
          ufs: ufInitials,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!state.selectedUf) {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response?.data.map((city) => city.nome);

        return dispatch({
          type: "GET_CITIES",
          cities: cityNames,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.selectedUf]);

  const handleSelectUfCallback = useCallback((event) => {
    const uf = event.target.value;
    console.log(uf);

    return dispatch({
      type: "SET_UF",
      selectedUf: uf,
    });
  }, []);

  const handleSelectCityCallback = useCallback((event) => {
    const city = event.target.value;
    console.log(city);

    return dispatch({
      type: "SET_CITY",
      selectedCity: city,
    });
  }, []);

  return (
    <FormContainer maxWidth="xl">
      <FlexForm onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastre seu Estabelecimento:</h1>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Nome</InputLabel>
          <OutlinedInput
            id="name"
            value={name}
            onChange={handleNameChange}
            label="Nome"
            ref={register({ required: true, maxLength: 80 })}
          />
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">UF</InputLabel>
          <Select
            id="uf"
            label="UF"
            variant="outlined"
            value={state.selectedUf}
            onChange={handleSelectUfCallback}
            ref={register({ required: true })}
            //helperText="Please select your currency"
          >
            {state.ufs.map((uf) => (
              <MenuItem key={uf} value={uf}>
                {uf}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Cidade</InputLabel>
          <Select
            id="city"
            label="Cidade"
            value={state.selectedCity}
            onChange={handleSelectCityCallback}
            ref={register({ required: true })}
            //helperText="Please select your currency"
          >
            {state.cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Endereço</InputLabel>
          <OutlinedInput
            id="address"
            value={address}
            onChange={handleAddressChange}
            label="Endereço"
            ref={register({ required: true, maxLength: 80 })}
          />
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Número</InputLabel>
          <OutlinedInput
            id="number"
            value={number}
            onChange={handleNumberChange}
            label="Número"
            ref={register({ required: true, maxLength: 80 })}
          />
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Telefone</InputLabel>
          <OutlinedInput
            id="telephone"
            value={telephone}
            onChange={handleTelephoneChange}
            label="Telefone"
            ref={register({ required: true, maxLength: 80 })}
          />
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">What's App</InputLabel>
          <OutlinedInput
            id="whatsapp"
            value={whatsapp}
            onChange={handleWhatsappChange}
            label="What's App"
            ref={register({ required: true, maxLength: 80 })}
          />
        </StyledFormControl>
        <DefaultButton variant="contained" size="large" type="submit">
          Cadastrar
        </DefaultButton>
      </FlexForm>
    </FormContainer>
  );
}
