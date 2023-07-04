import { Col, Row, Carousel } from "antd";
import styled from "styled-components";

//Styling components
const FSCardLayout = styled.div`
    border: 1px solid black;
`;

const FSCardTitle = styled.div`
    padding-left: 1vw;
    padding-bottom: 1vh
`;

const FSCarousel = styled(Carousel)`
    padding-bottom: 1vh;
`

const FSSlideShow = styled.div`
    padding: 1vw;
`;

const FSImage = styled.img`
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
`;

function FlashSaleCard(props) {
    return (
        <FSCardLayout>
            <FSCardTitle>FLASH SALE</FSCardTitle>
            <FSCarousel autoplay centerMode={true} slidesToShow={6}>
                {props.images.map((image, i) => {
                    return (
                        <FSSlideShow key={`SlideShow${i}`}>
                            <FSImage key={`Picture${i}`} src={image} />
                        </FSSlideShow>
                    );
                })}
            </FSCarousel>
        </FSCardLayout>
    );
}

export default FlashSaleCard;