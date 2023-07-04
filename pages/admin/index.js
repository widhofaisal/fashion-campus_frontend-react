import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Card, Typography } from "antd";
import { getCookie } from 'cookies-next';

import { EndPoint, TotalSales } from "../../SystemApis";

import AdminLayout from "../../layouts/AdminLayout";

const { Title } = Typography;

function AdminHomepage() {
    const router = useRouter();
    const [salesTotal, setSalesTotal] = useState(0);

    useEffect(() => {
        fetch(EndPoint + TotalSales, {
            headers: {
                'Authentication': getCookie("adminToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                setSalesTotal(data.data.total);
            });
    }, []);

    return (
        <AdminLayout
            title="Homepage">
            <Card style={{textAlign: "center"}}>
                <Title level={2}>Your Total Sales</Title>
                <Title level={1}>{salesTotal}</Title>
            </Card>
        </AdminLayout>
    );
}

export default AdminHomepage;