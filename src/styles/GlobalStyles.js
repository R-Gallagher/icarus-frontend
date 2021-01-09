import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { Row } from "antd";
import { media } from "./helpers";

// TRUELY GLOBAL STYLES THAT ARE DEFAULTS FOR ALL APP CSS
export const GlobalStyles = createGlobalStyle`
  h1 {
    font-weight: bold;
  }
  h2 {
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
  }
  h4 {
    font-weight: bold;
  }
  h5 {
    font-weight: bold;
  }
  h6 {
    font-weight: bold;
  }
`;

// IMPORTABLE STYLED COMPONENTS THAT ARE USED OFTEN THROUGH THE APP
/* STYLED STANDARD HTML ELEMENTS */
export const StyledDiv = styled.div`
  ${props =>
    props.centered &&
    css`
      display: "flex";
      align-items: "center";
      justify-content: "center";
    `};
  ${props =>
    props.highlighted &&
    css`
      -webkit-box-shadow: 3px 3px 10px 3px
        rgba(${props.theme.color.accent_rgba});
      -moz-box-shadow: 3px 3px 10px 3px rgba(${props.theme.color.accent_rgba});
      box-shadow: 3px 3px 10px 3px rgba(${props.theme.color.accent_rgba});
    `};
`;

export const StyledH1 = styled.h1`
  color: ${props => props.fontColor || props.theme.color.accent_hex};
  text-align: ${props => props.align || "center"};
  padding: ${props => props.padding || 0};
  font-weight: bold;
  ${media.xs`
    font-size: 32px;
  `}
  ${media.sm`
    font-size: 32px;
  `}
  ${media.md`
    font-size: 32px;
  `}
    font-size: 48px;
`;

export const StyledH2 = styled.h2`
  color: ${props => props.fontColor || props.theme.color.accent_hex};
  text-align: ${props => props.align || "center"};
  padding: ${props => props.padding || 0};
  font-weight: bold;
  ${media.xs`
    font-size: 24px;
  `}
  ${media.sm`
    font-size: 24px;
  `}
  ${media.md`
    font-size: 24px;
  `}
    font-size: 32px;
`;

export const StyledH3 = styled.h3`
  color: ${props => props.fontColor || props.theme.color.accent_hex};
  text-align: ${props => props.align || "center"};
  padding: ${props => props.padding || 0};
  font-weight: bold;
  ${media.xs`
    font-size: 18px;
  `}
  ${media.sm`
    font-size: 18px;
  `}
  ${media.md`
    font-size: 18px;
  `}
    font-size: 24px;
`;

export const StyledH4 = styled.h4`
  color: ${props => props.fontColor || props.theme.color.accent_hex};
  text-align: ${props => props.align || "center"};
  padding: ${props => props.padding || 0};
  font-weight: bold;
  ${media.xs`
    font-size: 18px;
  `}
  ${media.sm`
    font-size: 18px;
  `}
  ${media.md`
    font-size: 18px;
  `}
    font-size: 24px;
`;

export const StyledP = styled.p`
  color: ${props => props.fontColor || props.theme.color.accent_hex};
  text-align: ${props => props.align || "center"};
  ${media.xs`
    font-size: 16px;
  `}
  ${media.sm`
    font-size: 16px;
  `}
  ${media.md`
    font-size: 16px;
  `}
    font-size: 20px;
`;

export const StyledIframe = styled.iframe`
  ${media.xs`
      height: 178px;
      width: 100%;
  `}
  ${media.sm`
      height: 360px;
      width: 100%;
  `}
  ${media.md`
      height: 360px;
      width: 100%;
  `}
    height: 425px;
    width: 100%;
    display: block;
    border-radius: 5px;
    -webkit-box-shadow: 3px 3px 10px 3px #333333;
    -moz-box-shadow: 3px 3px 10px 3px #333333;
    box-shadow: 3px 3px 10px 3px #333333;
`;

/* STYLED ANT DESIGN COMPONENTS */

/* 
NOTE
Why does the API change for styled() when custom props are passed in to styled components?
https://github.com/styled-components/styled-components/issues/135#issuecomment-256018643
If we want custom props for styling,
- Destructure those props specifically, then destructure the rest of the props.
- Pass the rest of the props back to the dom, but not the props used for styling
This will prevent custom props from being mounted to the dom, which throws an error in console
It sure is ugly though, we should keep tabs on this issue to see if styled components ends up
changing the api to do this by default.
*/

export const StyledRow = styled(({ accentBackground, ...rest }) => (
  <Row {...rest} />
))`
  min-height: 75vh;
  padding: 10vh 0;
  background-color: ${props =>
    props.accentBackground ? props.theme.color.accent_hex : "white"};
`;
