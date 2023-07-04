import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
    Row,
    Col,
    Card,
    Typography,
    Pagination,
    Button,
    Popover,
    Upload,
    message
} from "antd";
import { FilterFilled, FunnelPlotFilled, PictureFilled } from "@ant-design/icons";

import { EndPoint, Categories, ProductsList, ProductsListByImage } from "../../SystemApis";

import styled from "styled-components";

import PublicLayout from "../../layouts/PublicLayout";
import CategoryGroup from "../../components/general/CategoryGroup";
import ProductBox from "../../components/general/ProductBox";

const { Title } = Typography;
const { Dragger } = Upload;

//Styling components
const ProductFilterBox = styled.div`
    width: 20vw;
    float: right;
`;

const SearchWordTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0;
`;

const SearchWordSubtitle = styled.p`
    font-size: 12px;
    font-weight: 400;
`;

const LeftColumn = styled.div`
  float: left;
`;

const RightColumn = styled.div`
  float: right;
`;

const ProductsShowcase = styled.div`
    clear: both;
`;

const ShowcaseCol = styled(Col)`
    margin-bottom: 2vh;
`;


const PaginationCol = styled(Col)`
    text-align: center;
`;

const SearchImage = styled.img`
    width: 11vw;
    height: 15vh;
    margin-right: 1vw;
`;

const PopoverContentProduct = styled.div`
  padding: 1vh 2vw;
  text-align: center;
`;

function ProductPage() {
    //List of Search things
    const [searchWord, setSearchWord] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [sortValue, setSortValue] = useState("Price a_z");
    const [categoryOptions, setCategoryOptions] = useState([]);

    const [currResult, setCurrResult] = useState(0);
    const [totalResult, setTotalResult] = useState(0);
    const [items, setItems] = useState([]);

    const [base64Pic, setBase64Pic] = useState("");


    const router = useRouter();

    //const categoryExample = [["Category A", "a"], ["Category B", "b"], ["Category C", "c"], ["Category D", "d"]]
    //const brandExample = [["Brand A", "a"], ["Brand B", "b"], ["Brand C", "c"], ["Brand D", "d"]]
    const conditionExample = [{ title: "New", id: "new" }, { title: "Used", id: "used" }]

    const popoverContent = (
        <div>
            <p><a onClick={() => sortHandler("Price a_z")}>Price Ascending</a></p>
            <p><a onClick={() => sortHandler("Price z_a")}>Price Descending</a></p>
        </div>
    );

    const formatNumberCurrency = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        const routerQuery = router.query;
        let type = "search";
        var cats = "";

        /* console.log(routerQuery['search']);
        console.log(routerQuery['perPage']);
        console.log(routerQuery['currPage']);
        console.log(routerQuery['sortOrd']);
        console.log(routerQuery['type']);
        console.log(routerQuery['base64']); */

        // Get the categories
        fetch(EndPoint + Categories)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setCategoryOptions(data.data)
            });

        var perPageTemp = perPage;
        var currPageTemp = currPage;

        if (routerQuery['type'] && routerQuery['type'] == "picture") {
            //setBase64Pic(getCookie('base64'));
            setBase64Pic(window.localStorage.getItem('base64'));

            type = "picture";
        }
        else if (routerQuery['search']) {
            window.localStorage.removeItem('base64');
            setBase64Pic("")
            setSearchWord(decodeURIComponent(routerQuery['search']))
        }

        //SET PER PAGE
        if (routerQuery['perPage']) {
            //setPerPage(routerQuery['perPage']);
            perPageTemp = routerQuery['perPage'];
        }

        //SET CURRENT PAGE
        if (routerQuery['currPage']) {
            setCurrPage(routerQuery['currPage']);
            currPageTemp = routerQuery['currPage']
        }

        //SET SORT PAGE
        if (routerQuery['sortOrd']) { setSortValue(decodeURIComponent(routerQuery['sortOrd'])) }

        /* let productArray = []
        for (let i = 0; i < 10; i++) {
            let product = [];
            product["pId"] = i;
            product["image"] = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";
            product["name"] = decodeURIComponent(routerQuery['search']) + " " + i;
            product["price"] = "Rp " + formatNumberCurrency(500000);
            productArray.push(product);
        }
        setItems(productArray);*/

        //Get Products
        if (type == "search") {
            cats = routerQuery['cat'];
            cats = (((typeof cats) != "undefined") && cats.length > 0) ? "&category=" + ((typeof cats) == "string" ? cats : cats.join(",")) : "";

            var prcs = ""
            if (routerQuery['prcStart']) {
                prcs = "&price=" + routerQuery['prcStart'] + "," + routerQuery['prcEnd'];
            }

            var kondisis = ""
            if (routerQuery['cond']) {
                kondisis = "&condition=" + routerQuery['cond'];
            }

            var pName = ""
            if (routerQuery['search']) {
                pName = "&product_name=" + routerQuery['search'];
            }

            if(routerQuery['search'] || routerQuery['cond'] ||routerQuery['prcStart'] || routerQuery['prcEnd'] || routerQuery['cat']){
                fetch(EndPoint + ProductsList +
                    "?page=" + currPageTemp +
                    "&page_size=" + 50 +
                    "&sort_by=" + sortValue +
                    pName +
                    cats +
                    prcs +
                    kondisis)
                    .then(response => response.json())
                    .then(data => {
                        if (data.data.length > 0) {
                            setItems(data.data);
                            setTotalResult(data.total_rows);
                            if (data.total_rows < perPage) {
                                perPageTemp = data.total_rows;
                            }
                            //console.log(data.message);
                            //console.log(perPage);
                            //console.log(data.total_rows);
                            //console.log(perPageTemp);
                            //console.log(currPageTemp);
                            //setPerPage(50);
                            setCurrResult(perPageTemp * currPageTemp);
                        }
                        //setCategoryOptions(data.data)
                    });
            }
        } else {
            var prcs = ""
            if (routerQuery['prcStart']) {
                prcs = "&price=" + routerQuery['prcStart'] + "," + routerQuery['prcEnd'];
            }

            var kondisis = ""
            if (routerQuery['cond']) {
                prcs = "&condition=" + routerQuery['cond'];
            }

            fetch(EndPoint + ProductsListByImage, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: window.localStorage.getItem('base64')
                })
            })
                .then(response => response.json())
                .then(data => {
                    if(data.category){
                        cats = "&category=" + data.category;
    
                        fetch(EndPoint + ProductsList +
                            "?page=" + currPageTemp +
                            "&page_size=" + 50 +
                            "&sort_by=" + sortValue +
                            cats +
                            prcs +
                            kondisis)
                            .then(response => response.json())
                            .then(data => {
                                if (data.data.length > 0) {
                                    setItems(data.data);
                                    setTotalResult(data.total_rows);
                                    if (data.total_rows < perPage) {
                                        perPageTemp = data.total_rows;
                                    }
                                    //setPerPage(perPageTemp);
                                    setCurrResult(perPageTemp * currPageTemp);
                                }
                                //setCategoryOptions(data.data)
                            });
                    }
                });
        }


    }, [router.query]);

    const onShowSizeChangeHandler = (currentPage, pageSize) => {
        //setPerPage(pageSize);
        setCurrResult(currentPage * pageSize);

        router.query["perPage"] = pageSize;
        router.push(router);
    }

    const onPaginationChangeHandler = (currentPage, pageSize) => {
        setCurrPage(currentPage);
        setCurrResult(currentPage * pageSize);

        router.query["currPage"] = currentPage;
        router.push(router);
    }

    const sortHandler = (sortKey) => {
        setSortValue(sortKey);

        router.query["sortOrd"] = sortKey;
        router.push(router);
    }

    const props = {
        name: 'searchFileUploadProduct',
        showUploadList: false,
        maxCount: 1,
        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);


                // Encode the file using the FileReader API
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Use a regex to remove data url part
                    const base64String = reader.result
                        .replace('data:', '')
                        .replace(/^.+,/, '');

                    //console.log(base64String);
                    //setCookie('base64', base64String);
                    window.localStorage.setItem('base64', base64String);
                    setBase64Pic(base64String);

                    //Calling lagi picture
                    const routerQuery = router.query;

                    var prcs = ""
                    if (routerQuery['prcStart']) {
                        prcs = "&harga=" + routerQuery['prcStart'] + "," + routerQuery['prcEnd'];
                    }

                    var kondisis = ""
                    if (routerQuery['cond']) {
                        prcs = "&kondisi=" + routerQuery['cond'];
                    }

                    fetch(EndPoint + ProductsListByImage, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            image: window.localStorage.getItem('base64')
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            var cats = "&category=" + data.category_id;

                            fetch(EndPoint + ProductsList +
                                "?page=" + currPage +
                                "&page_size=" + perPage +
                                "&sort_by=" + sortValue +
                                cats +
                                prcs +
                                kondisis)
                                .then(response => response.json())
                                .then(data => {
                                    var perPageTemp = perPage;

                                    if (data.data.length > 0) {
                                        setItems(data.data);
                                        setTotalResult(data.total_rows);
                                        if (data.total_rows < perPage) {
                                            perPageTemp = data.total_rows;
                                        }
                                        //setPerPage(perPageTemp);
                                        setCurrResult(perPageTemp * currPage);
                                    }
                                    //setCategoryOptions(data.data)
                                });
                        });
                    // Logs wL2dvYWwgbW9yZ...
                };
                reader.readAsDataURL(info.fileList[0].originFileObj);


            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <PublicLayout title="Product Page">
            <Row gutter={16}>
                <Col span={8}>
                    <ProductFilterBox>
                        <Card title={(<><FilterFilled /> Filter</>)}>
                            {!base64Pic && <CategoryGroup
                                key="CategoriesCG"
                                title="Categories"
                                type="checkbox"
                                options={categoryOptions}
                                paramKeyword="cat"
                            />}

                            <CategoryGroup
                                key="PricesCG"
                                title="Prices (in Rp.)"
                                type="slider"
                                maxVal={1000000}
                                paramKeyword="prc"
                            />

                            <CategoryGroup
                                key="ConditionsCG"
                                title="Conditions"
                                type="checkbox"
                                options={conditionExample}
                                paramKeyword="cond"
                            />
                        </Card>
                    </ProductFilterBox>
                </Col>
                <Col span={16}>
                    <div>
                        <LeftColumn>
                            {base64Pic != "" && (
                                <Fragment>
                                    <SearchWordTitle>Products similar to this image</SearchWordTitle><br />
                                    <SearchImage src={`data:image/png;base64, ${base64Pic}`} alt="search image" />
                                    <Popover
                                        trigger="click"
                                        content={() => {
                                            return (
                                                <Dragger {...props}>
                                                    <PopoverContentProduct>
                                                        Drop your image here or<br />
                                                        upload from your computer<br /><br />
                                                        <PictureFilled style={{ fontSize: '40px' }} />
                                                        <br /><br />
                                                        <Button type="primary">Browse</Button>
                                                    </PopoverContentProduct>
                                                </Dragger>
                                            );
                                        }}
                                    >
                                        <Button type="primary"><PictureFilled /> Change picture</Button>
                                    </Popover>
                                </Fragment>
                            )}
                            {base64Pic == "" && <SearchWordTitle>{searchWord}</SearchWordTitle>}
                            <SearchWordSubtitle>Search Results {currResult}/{totalResult}</SearchWordSubtitle>
                        </LeftColumn>
                        <RightColumn>
                            <Popover placement="bottomRight" trigger="click" content={popoverContent}>
                                <Button><Title level={5}><FunnelPlotFilled />Sort</Title></Button>
                            </Popover>
                        </RightColumn>
                    </div>
                    <br /><br />
                    <ProductsShowcase>
                        <Row gutter={16}>
                            {items.map(item => {
                                return (
                                    <ProductBox
                                        key={item.title}
                                        pId={item.id}
                                        name={item.title}
                                        image={EndPoint + item.image}
                                        price={formatNumberCurrency(item.price)}
                                    />
                                );
                            })}
                        </Row>
                    </ProductsShowcase>
                </Col>
                <Col span={8}></Col>
                <PaginationCol span={12}>
                    <Pagination
                        key="productPagination"
                        current={currPage}
                        total={totalResult}
                        pageSize={perPage}
                    />
                </PaginationCol>
            </Row>
        </PublicLayout>
    );
}

export default ProductPage;