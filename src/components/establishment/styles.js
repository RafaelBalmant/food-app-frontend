/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { primaryColors, secondaryColors } from "../../helpers/colors.json";

export const FormContainer = styled(Container)`
  background-color: ${primaryColors.first} !important;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

export const FlexForm = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 10% 0 10%;

  h1 {
    text-align: center;
    margin: 10px 0 10px 0;
    color: ${secondaryColors.second} !important;
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin: 10px 0 10px 0;
`;

export const DefaultButton = styled(Button)`
  background-color: ${primaryColors.first} !important;
  color: white !important;
  border-radius: 5px !important;
  border-color: ${primaryColors.first} !important;
  margin: 10px 0 10px 0;

  &&:hover {
    background-color: ${primaryColors.first};
  }
`;
