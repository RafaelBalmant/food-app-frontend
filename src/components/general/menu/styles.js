/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import { primaryColors, secondaryColors } from "../../../helpers/colors.json";

export const MenuContainer = styled(Container)`
  height: 25vh;
  background-color: #fafafa;
  color: ${primaryColors.first};
`;
