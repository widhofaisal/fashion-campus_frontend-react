import { Fragment } from "react";
import { deleteCookie } from 'cookies-next';

import Image from "next/image";
import { useRouter } from "next/router";

import { Menu } from "antd";

import styled from "styled-components";

import { menubarItems } from "../../SystemConfig";

//Styling components
const MenubarBackground = styled.div`
  position: fixed;
  top: 0;
  width: 14vw;
  background-color: #143F5D;
  height: 100vh;
  color: white;
  padding-top: 15px;
  box-shadow: inset -4px 0px 4px #0000000f;
`;

const ImageBox = styled.div`
  margin-left: 5vw;
`;

function AdminMenubar() {
  const router = useRouter();

  const onClick = (e) => {
    console.log("click ", e.key);
    const url = "/admin" + (e.key == "home" ? "" : ("/"+e.key));
    if(e.key == "logout"){
      deleteCookie("adminToken")
      router.push("/adminLogin");
    }else{
      router.push(url);
    }
  };

  return (
    <Fragment>
      <MenubarBackground>
        <ImageBox>
          <Image
            src="/images/Fashion Campus Logo.png"
            alt="Fashion Campus Logo"
            width={60}
            height={60}
          />
        </ImageBox>
        <Menu
          onClick={onClick}
          id="MenuBarMenu"
          mode="inline"
          items={menubarItems}
          style={{
              backgroundColor: "#143F5D",
              marginTop: "5vh"
          }}
        />
      </MenubarBackground>
    </Fragment>
  );
}

export default AdminMenubar;
