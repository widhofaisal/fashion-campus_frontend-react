import { useEffect, useState } from "react";

import { Carousel, Col, Row } from "antd";
import styled from "styled-components";

import PublicLayout from "../layouts/PublicLayout";
import CategoryCard from "../components/general/CategoryCard";
import FlashSaleCard from "../components/general/FlashSaleCard";

//import API
import { EndPoint, HomeBanner, HomeCategory } from "../SystemApis";

//Styling components
const CarouselPicture = styled.img`
  width: 87.5vw;
`;

function Home() {
  const [homeBanners, setHomeBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(EndPoint + HomeBanner)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setHomeBanners(data.data)
      });

    fetch(EndPoint + HomeCategory)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setCategories(data.data)
      });
  }, []);

  return (
    <PublicLayout title="Home">
      <Carousel autoplay centerMode={true}>
        {/*<div>
          <CarouselPicture src="https://s4.bukalapak.com/cinderella/ad-inventory/630c73b8c2f1060001e53669/w-1344/DESK_Home_Banner_2018%20%5B1668x704%5D%20(66)-1661760426545.jpg.webp" />
        </div>
        <div>
          <CarouselPicture src="https://s4.bukalapak.com/cinderella/ad-inventory/630c3e6ef7dfb30001770619/w-1344/DESK_Home_Banner_2018_%5B1668x704%5D%20(13)%20(15)-1661746782199.jpg.webp" />
        </div>
        <div>
          <CarouselPicture src="https://s4.bukalapak.com/cinderella/ad-inventory/631573b3f7dfb30001770659/w-1344/Home%20Banner%20Bukalapak_Desktop%20%5B1668x704%5D%20-%202022-09-05T105535-1662350208971.233.webp" />
        </div>
        <div>
          <CarouselPicture src="https://s4.bukalapak.com/cinderella/ad-inventory/6315746bf7dfb3000177065b/w-1344/Home%20Banner%20Bukalapak_Desktop%20%5B1668x704%5D%20-%202022-09-05T105914-1662350402931.773.webp" />
        </div>*/}

        {homeBanners.map(banner => {
          return (
            <div key={"CarouselPicture"+banner.id}>
              <CarouselPicture src={EndPoint + banner.image} alt={banner.title} key={banner.id} />
            </div>
          )
        })}
      </Carousel>

      <br />

      <Row gutter={16}>
        {/* <Col className="gutter-row" span={12}>
          <CategoryCard
            title="Shop Wanita"
            image="https://dynamic.zacdn.com/bJ6LiKliLWJgAqEc2U9599KZ7ak=/326x400/filters:quality(60):format(webp)/https://static-id.zacdn.com/cms/cw43/01_WANITA_43A.jpg"
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <CategoryCard
            title="Shop Pria"
            image="https://dynamic.zacdn.com/LtQwiYhluLjl3k0NtBlCL6kDLn4=/326x400/filters:quality(60):format(webp)/https://static-id.zacdn.com/cms/cw43/02_PRIA_43A.jpg"
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <CategoryCard
            title="Shop Anak-anak"
            image="https://dynamic.zacdn.com/qIl_6QIRbgumR99YsXkj3BbnIrg=/326x400/filters:quality(60):format(webp)/https://static-id.zacdn.com/cms/cw43/03_ANAK_43A.jpg"
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <CategoryCard
            title="Shop Health & Beauty"
            image="https://dynamic.zacdn.com/fx9tXJ6miD_LSkf1y-yUmgq64n8=/326x400/filters:quality(60):format(webp)/https://static-id.zacdn.com/cms/cw43/04_BEAUTY_43A.jpg"
          />
      </Col> */}
        {categories.map(category => {
          return (
            <Col className="gutter-row" span={12} key={`col${category.id}`}>
              <a href={`/product?cat=${category.id}`}>
                <CategoryCard
                  key={`category${category.id}`}
                  title={category.title}
                  image={EndPoint + category.image}
                />
              </a>
            </Col>
          )
        })}
      </Row>

      <br />

      {/* <FlashSaleCard
        images={[
          "https://s1.bukalapak.com/img/11556714892/s-246-246/data.jpeg.webp",
          "https://s2.bukalapak.com/img/23991616792/s-246-246/data.jpeg.webp",
          "https://s2.bukalapak.com/img/25081499692/s-246-246/data.jpeg.webp",
          "https://s2.bukalapak.com/img/79689041572/s-246-246/data.jpeg.webp",
          "https://s0.bukalapak.com/img/58914080992/s-246-246/data.jpeg.webp",
          "https://s1.bukalapak.com/img/66099775371/s-246-246/data.jpeg.webp"
        ]}
      /> */}
    </PublicLayout>
  )
}

export default Home;