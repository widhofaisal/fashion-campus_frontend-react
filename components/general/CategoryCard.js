import { Card } from "antd";
import styled from "styled-components";

//Styling components
const CardTitle = styled.div`
    text-align: center;
    font-weight: bold;
`;
const CardPicture = styled.div`
    text-align: center;
`;

const CategoryPic = styled.img`
    width: 30vw;
`;

function CategoryCard(props) {
    return (
        <Card>
            <CardTitle>{props.title}</CardTitle><br/>
            <CardPicture><CategoryPic src={props.image} alt={props.title} /></CardPicture>
        </Card>
    );
}

export default CategoryCard;