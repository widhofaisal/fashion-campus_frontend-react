import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Checkbox, Slider } from "antd";

import styled from "styled-components";

const { Title } = Typography;

//Styling components
const CategoryBox = styled.div`
    padding-right: 1vw;
`;

function    CategoryGroup(props) {
    const router = useRouter();

    const [checkboxValue, setCheckboxValue] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    let formItems = [];

    useEffect(() => {
        if (props.type == "checkbox") {
            const paramsArrVal = router.query[props.paramKeyword];
            if (paramsArrVal != undefined) {
                const paramsArrValType = typeof paramsArrVal;
                if(paramsArrValType == "string" ){
                    setCheckboxValue([paramsArrVal]);
                }
                else{
                    setCheckboxValue(paramsArrVal);
                }
            }
        } else if (props.type == "slider") {
            const paramStart = router.query[props.paramKeyword + "Start"];
            const paramEnd = router.query[props.paramKeyword + "End"];
            if (paramStart != undefined && paramEnd != undefined) {
                setPriceRange([paramStart, paramEnd]);
            }
        }

    }, [props]);

    //Methods
    const onChangeCheckboxHandler = e => {
        //console.log(e);
        //console.log(checkboxValue);

        let items = [];
        if (checkboxValue.length > 0) {
            items = checkboxValue;
        }

        if (e.target.checked) {
            items.push(e.target.value)
        } else {
            items = items.filter(f => f !== e.target.value)
        }
        //console.log(items);
        setCheckboxValue(items);

        router.query[props.paramKeyword] = items;
        router.push(router);

    };

    const onChangeSliderHandler = e => {
        router.query[props.paramKeyword + "Start"] = e[0];
        router.query[props.paramKeyword + "End"] = e[1];
        router.push(router);
    }

    const formatNumberCurrency = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Get the type and set the value
    if (props.type == "checkbox") {
        props.options.map(option => {
            //console.log(option.id)
            //console.log(checkboxValue)
            //console.log(checkboxValue.includes(option.id.toString()))
            const checkedVal = (checkboxValue && checkboxValue.includes(option.id.toString())) ? true : false;
            formItems.push(
                <div>
                    <Checkbox onChange={onChangeCheckboxHandler} value={option.id} checked={checkedVal}>{option.title}</Checkbox>
                </div>)
        })
    }
    else if (props.type == "slider") {
        const maxVal = props.maxVal;
        const marks = {
            0: "0",
            [maxVal]: formatNumberCurrency(maxVal)
        }
        const formatterMoney = (value) => `${formatNumberCurrency(value)}`;

        formItems.push(
            <CategoryBox>
                <Slider
                    key={props.paramKeyword}
                    range={{
                        draggableTrack: true,
                    }}
                    marks={marks}
                    max={maxVal}
                    onAfterChange={onChangeSliderHandler}
                    value={priceRange}
                />
            </CategoryBox>)
    }

    return (
        <Fragment>
            <Title level={5}>{props.title}</Title>
            {formItems}
        </Fragment>
    );
}

export default CategoryGroup;