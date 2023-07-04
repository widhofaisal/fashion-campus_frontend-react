import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

import { EndPoint, Categories } from "../../../SystemApis";

import { Button, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import AdminLayout from "../../../layouts/AdminLayout";

function ProductCategories() {
    const router = useRouter();

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch(EndPoint + Categories, {
            headers: {
                'Authentication': getCookie("adminToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                setTableData(data.data);
            });
    }, []);

    const deleteHandler = (key) => {
        fetch(EndPoint + Categories + "/"+key, {
            method: "DELETE",
            headers: {
                'Authentication': getCookie("adminToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                notification.open({
                    description: data.message
                })
            });
        //console.log(`User with id ${key} is deleted!`);
    }

    const editHandler = (key,title) => {
        //console.log(`User with id ${key} is edited!`)
        router.push("/admin/productCategories/" + key+"-"+title);
    }

    //Table Structures
    const [sortedInfo, setSortedInfo] = useState({});

    const tableStructure = [
        {
            title: "No.",
            key: "index",
            render: (text, record, index) => index + 1
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="primary" icon={<EditOutlined />} size={"large"} onClick={() => editHandler(record.id, record.title)} />&nbsp;
                    <Button type="danger" icon={<DeleteOutlined />} size={"large"} onClick={() => deleteHandler(record.id)} />
                </>
            )
        }
    ];

    return (
        <AdminLayout
            title="Product Categories"
            singleWord="productCategories"
            addButton={true}
            showTable={true}
            tableStructure={tableStructure}
            tableData={tableData}
            onSetSortedInfo={setSortedInfo.bind()}
        />
    );
}

export default ProductCategories;