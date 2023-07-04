import { Fragment } from "react";

import styled from "styled-components";

import PublicContent from "../components/publics/PublicContent";
import PublicFooter from "../components/publics/PublicFooter";
import PublicNavbar from "../components/publics/PublicNavbar";

import WebsiteHead from "../components/WebsiteHead";

//Styling components
const PublicBox = styled.div`
  overflow-x: hidden;
  max-width: 100vw;
`;

function PublicLayout(props) {
  return (
    <Fragment>
      <WebsiteHead
        title={`${props.title} page - Startup Campus e-commerce`}
        desc="Startup Campus E-commerce"
      />
      <PublicBox>
        <PublicNavbar />
        <PublicContent>
          {props.children}
        </PublicContent>
        <PublicFooter />
      </PublicBox>
    </Fragment>
  );
}

export default PublicLayout;
