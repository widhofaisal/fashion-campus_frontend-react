import { Fragment } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";

import { Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

//Import Redux
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../store/features/userReducer";

//Styling components
const NavbarBackground = styled.div`
  position: absolute;
  padding: 13px 15px;
  top: 0;
  background-color: darkblue;
  color: white;
  width: 100vw;
  height: 9vh;
  box-shadow: 0 8px 8px -4px #0000000f;
`;

const LeftNavbar = styled.div`
  float: left;
`;

const RightNavbar = styled.div`
  float: right;
  font-size: 20px;
`;

const NavbarMenu = styled(Menu)`
  background-color: transparent;
  color: white;
  border-bottom: none;
  &:hover,
  &:active,
  &:focus-active {
    border-bottom: none;
    color: white !important;
    font-weight: bold !important;
  }
  
`;

//Menu configuration
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const navbarItems = [
  getItem("Admin", "User", <UserOutlined />, [
    getItem("Profile", "profile", <UserOutlined />),
    getItem("Settings", "settings", <SettingOutlined />),
    getItem("Logout", "logout", <LogoutOutlined />),
  ]),
];

function AdminNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick = (e) => {
    console.log("click ", e);
    if(e.key == "logout"){
      dispatch(logoutHandler());
      router.push('/adminLogin');
    }
  };

  return (
    <Fragment>
      <NavbarBackground>
        <LeftNavbar>
          
        </LeftNavbar>
        <RightNavbar>
          <NavbarMenu id="NavBarMenu" onClick={onClick} mode="horizontal" items={navbarItems} />
        </RightNavbar>
      </NavbarBackground>
    </Fragment>
  );
}

export default AdminNavbar;
