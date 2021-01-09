import React from "react";
import { Link } from "react-router-dom";

import { StyledDiv, StyledH1, StyledH3 } from "../../styles/GlobalStyles";

const FourOhFour = () => {
  // Grab the current env so we only show Scoobs on dev.
  const env = JSON.stringify(process.env.REACT_APP_DEV_ENV);

  if (env === JSON.stringify("prod")) {
    return (
      <div>
        <StyledDiv
          centered={true}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <StyledDiv>
              <StyledH1>This ain't no page I ever heard of!</StyledH1>
              <StyledH3>
                This page doesn't exist. Click here to return to the homepage.
              </StyledH3>
            </StyledDiv>
          </Link>
          <img 
            alt="Page not found"
            src="https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.us-east-2.amazonaws.com/404.png" 
          />
          <a href="https://www.icons8.com">Image by Icons8</a>
        </StyledDiv>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Ruh-roh Raggy! You&apos;re in the wrong place!</h1>
        <iframe
          title="Scooby Doo"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/0_C2HJvtRDY?autoplay=1&start=5"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
};

export default FourOhFour;
