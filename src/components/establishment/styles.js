/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import {
  Button,
} from 'antd';
import { primaryColors } from '../../helpers/colors.json';

export const DefaultButton = styled(Button)`
    background-color: ${primaryColors.first} !important;
    color: white !important;
    border-radius: 5px !important;
    border-color: ${primaryColors.first} !important;

    &&:hover{
        background-color: ${primaryColors.first};
    }
`;
