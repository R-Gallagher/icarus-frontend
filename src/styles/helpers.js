import { css } from "styled-components";

// these are ant design standards, based off of bootstraps standards
const sizes = {
  xl: 1600,
  lg: 1200,
  md: 992,
  sm: 768,
  xs: 576,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
