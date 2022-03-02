import {MouseEventHandler, ReactElement} from 'react';

import '../assets/styles/Button.css';

type ButtonProps = {
  lable?: string;
  onclick: MouseEventHandler;
  separator?: boolean;
  circle?: boolean;
  icon?: ReactElement;
  margin?: string;
  fontSize?: string;
};

export const Button = ({
  lable,
  onclick,
  icon,
  separator,
  circle,
  fontSize,
  margin,
}: ButtonProps) => {
  const buttonStyle = {
    fontSize: fontSize || '1rem',
    margin: margin || '5px',
  };

  return (
    <button onClick={onclick} className="site-button" style={buttonStyle}>
      {lable}
      {separator && <span className="separator"></span>}
      {icon}
    </button>
  );
};
