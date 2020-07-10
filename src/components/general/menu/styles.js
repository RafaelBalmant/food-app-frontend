/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { primaryColors } from '../../../helpers/colors.json';

export const Container = styled('div')`
    background-color: ${primaryColors.first};
    color: ${primaryColors.second}
`;
