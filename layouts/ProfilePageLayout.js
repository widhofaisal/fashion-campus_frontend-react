import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { hasCookie, deleteCookie } from 'cookies-next';

import { Row, Col, Menu } from "antd";
import styled from "styled-components";

import { profileMenuItems } from "../SystemConfig";

//Styling components
const ProfilePageBox = styled.div`
    padding: 5vh 10vw;
`;

function ProfilePageLayout(props) {
    const router = useRouter();

    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        if (!hasCookie('userToken')) {
            router.push("/Login");
            return;
        } else {
            setShowPage(true);
        }
    }, []);

    const onClick = (e) => {
        //console.log("click ", e.key);
        if (e.key == "logout") {
            deleteCookie("userName");
            deleteCookie("userToken");
            deleteCookie("userPhoneNumber");
            deleteCookie("userEmail");
            router.push("/");
        } else {
            const url = "/profile/" + e.key;
            router.push(url);
        }
    };

    return (
        <Fragment>
            {showPage && (<ProfilePageBox>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={profileMenuItems}
                            defaultSelectedKeys={[props.menuKey]}
                            onClick={onClick}
                        />
                    </Col>
                    <Col className="gutter-row" span={16}>
                        {props.children}
                    </Col>
                </Row>
            </ProfilePageBox>)}
        </Fragment>
    );
}

export default ProfilePageLayout;