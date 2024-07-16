import React from 'react';
import styled from 'styled-components';
import { TitleText, ContentBox, GlassBox } from '../styles/convertBoxStyles';

type props = {
  data: string;
};

const StatisticsBox = ({ data }: props) => (
  <GlassBox hasData={true}>
    <TitleText>통계</TitleText>
    <ContentBox></ContentBox>
  </GlassBox>
);

export default StatisticsBox;
