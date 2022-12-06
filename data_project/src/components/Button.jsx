import React from "react";
import {navLink} from '../constants';

const Button = ({ styles }) => (
  <ul className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    {navLink.map((nav, index) => (
          <li
            key = {nav.id}
          >
            <a href={`#${nav.id}`}>
              {nav.title}
            </a>
          </li>
        ))}
  </ul>
);

export default Button;