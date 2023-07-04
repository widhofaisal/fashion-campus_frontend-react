import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

import { EndPoint, GetOrderApi } from "../../SystemApis";

import AdminLayout from "../../layouts/AdminLayout";

function AdminOrderPage() {
    const router = useRouter();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch(EndPoint + GetOrderApi +
            "?page_size=50000" +
            "&page=1", {
            headers: {
                'Authentication': getCookie("adminToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data.data)
                setTableData(data.data);
            });
    }, []);

    // Funcs
    const formatNumberCurrency = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Table Structures
    const [sortedInfo, setSortedInfo] = useState({});

    const tableStructure = [
        {
            title: "Cust ID",
            key: "user_id",
            dataIndex: "user_id",
        },
        {
            title: "Name",
            dataIndex: "user_name",
            key: "user_name",
            sorter: (a, b) => a.user_name.localeCompare(b.user_name),
            sortOrder: sortedInfo.columnKey === "user_name" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Email",
            dataIndex: "user_email",
            key: "user_email",
            sorter: (a, b) => a.user_email.localeCompare(b.user_email),
            sortOrder: sortedInfo.columnKey === "user_email" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Amount",
            key: "amount",
            render: (_, record) => (
                "Rp. " + formatNumberCurrency(record.total)
            )
        },
        {
            title: "Date",
            dataIndex: "created_at",
            key: "created_at",
            sorter: (a, b) => a.created_at.localeCompare(b.created_at),
            sortOrder: sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
            ellipsis: true,
        },

    ];

    return (
        <AdminLayout
            title="Orders Page"
            singleWord="orders"
            showTable={true}
            tableStructure={tableStructure}
            tableData={tableData}
            onSetSortedInfo={setSortedInfo.bind()}
        />
    )
}

export default AdminOrderPage;