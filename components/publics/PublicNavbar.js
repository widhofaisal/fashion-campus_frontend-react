import { Fragment, useRef, useEffect, useState } from "react";

import { hasCookie } from 'cookies-next';

import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';

//import API
import { EndPoint, HomeCategory } from "../../SystemApis";

import styled from "styled-components";

import { Input, Button, Popover, Upload, message } from "antd";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined, UploadOutlined, PictureFilled } from "@ant-design/icons";

const { Dragger } = Upload;

//Styling components
const NavbarBackground = styled.div`
  position: fixed;
  top: 0;
  padding: 2vh 1vw;
  background-color: #529EBF;
  color: black;
  width: 100%;
  height: 10vh;
  box-shadow: 0 8px 8px -4px #0000000f;
  z-index: 10;
`;

const LeftNavbar = styled.div`
  float: left;
`;

const RightNavbar = styled.div`
  float: right;
  font-size: 20px;
`;

const ImageBox = styled.div`
  margin-left: 2vw;
  display: inline-block;
`;

const CategoriesBar = styled.div`
  display: inline-block;
  position: relative;
  top: -2vh;
`;

const CategoryLink = styled.a`
    font-size: 1.15vw;
    color: black;
    margin-left: 1vw;
`;

const SearchGroup = styled(Input.Group)`
  display: inline-block !important;
  width: 50vw;
  position: relative;
  top: -3vh;
`;

const SearchInput = styled(Input.Search)`
  display: inline-block !important;
  width: 40vw;
  margin-left: 2vw;
  height: 5vh;
`;

const UploadPopover = styled(Popover)`
  background-color: #529EBF;
`;

const PopoverContent = styled.div`
  padding: 1vh 2vw;
  text-align: center;
`;

function PublicNavbar(e) {
  const router = useRouter();
  const searchTermInput = useRef("");
  const [categoriesNavbar, setCategoriesNavbar] = useState([])

  useEffect(() => {
    fetch(EndPoint + HomeCategory)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setCategoriesNavbar(data.data)
      });
  }, []);

  const onSearchHandler = () => {
    const searchTermInputValue = searchTermInput.current.input.value;
    const encodedParams = searchTermInputValue != "" ? encodeURIComponent(searchTermInputValue) : "";

    router.push({
      pathname: "/product",
      query: { search: encodedParams }
    });
  }

  const props = {
    name: 'searchFileUpload',
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
          router.push({
            pathname: "/product",
            query: { type: 'picture' }
          })
          // Logs wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(info.fileList[0].originFileObj);

        //console.log(info.fileList[0].originFileObj);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Fragment>
      <NavbarBackground>
        <LeftNavbar>
          <ImageBox>
            <Link href="/">
              <Image
                src="/images/Fashion Campus Logo.png"
                alt="Fashion Campus Logo"
                width={50}
                height={50}
              />
            </Link>
          </ImageBox>
          <CategoriesBar>
            {/*
              <CategoryLink href="http://www.google.com" target="_blank">Category A</CategoryLink>
              <CategoryLink href="http://www.google.com" target="_blank">Category B</CategoryLink>
              <CategoryLink href="http://www.google.com" target="_blank">Category C</CategoryLink>
              <CategoryLink href="http://www.google.com" target="_blank">Category D</CategoryLink>
            */}
            {categoriesNavbar.map(category => {
              return (
                <CategoryLink key={"CategoryNavbar"+category.id} href={`/product?cat=${category.id}`} target="_blank">{category.title}</CategoryLink>
              )
            })}
          </CategoriesBar>
          <SearchGroup compact>
            <SearchInput
              placeholder="Search / upload your picture"
              ref={searchTermInput}
              onPressEnter={onSearchHandler}
              onSearch={onSearchHandler}
            />
            <UploadPopover placement="bottomRight" content={() => {
              return (
                <Dragger {...props}>
                  <PopoverContent>
                    Drop your image here or<br />
                    upload from your computer<br /><br />
                    <PictureFilled style={{ fontSize: '40px' }} />
                    <br /><br />
                    <Button type="primary">Browse</Button>
                  </PopoverContent>
                </Dragger>
              );
            }} trigger="click">
              <Button icon={<UploadOutlined />} />
            </UploadPopover>
          </SearchGroup>
        </LeftNavbar>
        <RightNavbar>
          {!hasCookie('userToken') && <Link href="/Login"><UserOutlined style={{ paddingTop: "1vh", marginRight: "1vw" }} /></Link>}
          {hasCookie('userToken') && <Link href="/profile/myAccount"><UserOutlined style={{ paddingTop: "1vh", marginRight: "1vw" }} /></Link>}
          {/* <Link href={`/profile/wishlist`}><HeartOutlined style={{ paddingTop: "1vh", marginRight: "1vw" }} /></Link> */}
          {hasCookie('userToken') && <Link href="/checkout"><ShoppingCartOutlined style={{ paddingTop: "1vh" }} /></Link>}
        </RightNavbar>
      </NavbarBackground>
    </Fragment>
  );
}

export default PublicNavbar;