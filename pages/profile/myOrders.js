import { useState, useEffect } from "react";

import { getCookie } from 'cookies-next';
import { EndPoint, GetOrderList } from "../../SystemApis";

import PublicLayout from "../../layouts/PublicLayout";
import ProfilePageLayout from "../../layouts/ProfilePageLayout";
import OrderBox from "../../components/general/OrderBox";

function MyOrdersPage() {
    const [productList, setProductList] = useState([]);

    useEffect(()=>{

        fetch(EndPoint + GetOrderList, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                setProductList(data.data);
            });

        /* const testProductsList = [{
            id: 1,
            date: "2011-10-10T14:48:00Z",
            shippingMethod: 50000,
            address: "22, Street Road, South <br />Jakarta, DKI Jakarta, 12029",
            orderStatus: 1,
            products: [{
                name: "baju wanita",
                pId: 1,
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: "Rp " + "150.000"
            },
            {
                name: "Topi wanita",
                pId: 2,
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: "Rp " + "50.000"
            }
            ]
        },
        {
            id: 2,
            date: "2011-10-10T14:48:00Z",
            shippingMethod: 50000,
            address: "22, Street Road, South <br />Jakarta, DKI Jakarta, 12029",
            orderStatus: 2,
            products: [{
                name: "baju wanita",
                pId: 3,
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: "Rp " + "150.000"
            },
            {
                name: "Topi wanita",
                pId: 4,
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: "Rp " + "50.000"
            },
            {
                name: "Rok wanita",
                pId: 5,
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                price: "Rp " + "250.000"
            }
            ]
        }
        ] */
    },[]);

    return (
        <PublicLayout title="My Orders Page">
            <ProfilePageLayout menuKey="myOrders">
                {productList.map(item => {
                    return (
                        <OrderBox 
                            key={item.id}
                            date={item.created_at}
                            idItem={item.id}
                            shpMthd={item.shipping_method}
                            address={item.shipping_address}
                            orderStatus={item.status}
                            products={item.products}
                        />
                    )
                })}
            </ProfilePageLayout>
        </PublicLayout>
    );
}

export default MyOrdersPage;