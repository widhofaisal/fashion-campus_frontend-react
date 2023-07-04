import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import styled from "styled-components";

import { Typography } from "antd";
const { Title } = Typography;

//Styling components
const FooterBackground = styled.div`
  position: relative;
  padding: 3vh 1vw;
  background-color: #529EBF;
  color: black;
  width: 100vw;
  height: 40vh;
`;

const LeftFooter = styled.div`
  float: left;
  margin-left: 2vw;
`;

const RightFooter = styled.div`
  float: right;
  width: 20vw;
`;

const MiddleFooter = styled.div`
   position: absolute;
   left: 50vw;
`;

const ImageBox = styled.div`
`;

const DescriptionBox = styled.div`
    width: 25vw;
`;

const ChannelsBox = styled.div`
    margin-top: 2vh;
`;

const ChannelIcon = styled.span`
    margin-right: 0.5vw;
`;

const LinkedText = styled.a`
    font-size: 1.15vw;
    color: black;
    display: block;
`;

const AddressText = styled.p`
    text-align: justify;
    width: 15vw;
`;

/*
<DescriptionBox>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui nec pulvinar ultricies. Fusce accumsan auctor elit, ac hendrerit justo malesuada ac. Donec faucibus aliquam feugiat. Mauris commodo tellus sed pulvinar convallis.
</DescriptionBox>

<MiddleFooter>
    <LinkedText href="http://www.google.com" target="_blank"> About us</LinkedText>
    <LinkedText href="http://www.google.com" target="_blank"> Product & services</LinkedText>
    <LinkedText href="http://www.google.com" target="_blank"> Payment status</LinkedText>
    <LinkedText href="http://www.google.com" target="_blank"> Track your order</LinkedText>
    <LinkedText href="http://www.google.com" target="_blank"> Become our seller</LinkedText>
    <LinkedText href="http://www.google.com" target="_blank"> Contact us</LinkedText>
</MiddleFooter>
*/


function PublicFooter() {
    return (
        <Fragment>
            <FooterBackground>
                <LeftFooter>
                    <Link href={'/'}>
                        <ImageBox>
                            <Image
                                src="/images/Fashion Campus Logo.png"
                                alt="Fashion Campus Logo"
                                width={50}
                                height={50}
                            />
                        </ImageBox>
                    </Link>
                    <ChannelsBox>
                        <Title level={4}>Our Channels</Title>
                        <a href="https://www.instagram.com/startupcampus.id/" target="_blank" rel="noreferrer">
                            <ChannelIcon>
                                <Image
                                    src="/images/icons/instagram.png"
                                    alt="Instagram Logo"
                                    width={30}
                                    height={30}
                                />
                            </ChannelIcon>
                        </a>
                        <a href="https://www.linkedin.com/company/startupcampusid/" target="_blank" rel="noreferrer">
                            <ChannelIcon>
                                <Image
                                    src="/images/icons/linkedin.png"
                                    alt="Linkedin Logo"
                                    width={30}
                                    height={30}
                                />
                            </ChannelIcon>
                        </a>
                        <a href="https://www.youtube.com/channel/UCbVbOn_GRQXbIHUA6NP9t3w" target="_blank" rel="noreferrer">
                            <ChannelIcon>
                                <Image
                                    src="/images/icons/youtube.png"
                                    alt="Youtube Logo"
                                    width={30}
                                    height={30}
                                />
                            </ChannelIcon>
                        </a>
                    </ChannelsBox>
                </LeftFooter>
                <RightFooter>
                    <Title level={5}>Our Location</Title>
                    <AddressText>
                        Jl. Sunan Giri No.7A, RT.2/RW.15, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220, Indonesia
                    </AddressText>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d126917.80187000643!2d106.7929715!3d-6.2398191!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f494bb3e76b9%3A0x5e59265b6afdc4ba!2sYAPI%20Center!5e0!3m2!1sen!2sde!4v1665740765343!5m2!1sen!2sde" width="200" height="110" style={{ border: 0 }} loading="lazy"></iframe>
                </RightFooter>
            </FooterBackground>
        </Fragment>
    )
}

export default PublicFooter;