import React from 'react';

type props = {
  name: string;
};

const MainIndicator = ({ name }: props) => (
  <>
    <div>Hello, {name}</div>
  </>
);

export default MainIndicator;
