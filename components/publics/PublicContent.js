import { Fragment } from "react";

import styled from "styled-components";

//Styling components
const ContentBackground = styled.div`
  position: relative;
  margin-top: 9vh;
  padding: 3vh 1vw;
`;

function PublicContent(props) {
    return (
        <Fragment>
            <ContentBackground>
                {props.children}
            </ContentBackground>
        </Fragment>
    );
}

export default PublicContent;