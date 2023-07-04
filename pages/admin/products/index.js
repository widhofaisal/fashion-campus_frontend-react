import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

import { EndPoint, ProductsList } from "../../../SystemApis";

import { Button, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import AdminLayout from "../../../layouts/AdminLayout";

function AdminProducts() {
  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  const deleteHandler = (key) => {
    fetch(EndPoint + ProductsList + "/" + key, {
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
  }

  const editHandler = (key) => {
    //console.log(`User with id ${key} is edited!`)
    router.push("/admin/products/" + key);
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (record) => <img src={EndPoint+record} style={{ width: '8vw' }} />
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" icon={<EditOutlined />} size={"large"} onClick={() => editHandler(record.id)} />&nbsp;
          <Button type="danger" icon={<DeleteOutlined />} size={"large"} onClick={() => deleteHandler(record.id)} />
        </>
      )
    }
  ];

  useEffect(() => {
    fetch(EndPoint + ProductsList +
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

  return (
    <AdminLayout
      title="Products"
      singleWord="Product"
      slug="products"
      addButton={true}
      showTable={true}
      tableStructure={tableStructure}
      tableData={tableData}
      onSetSortedInfo={setSortedInfo.bind()}
    />
  );
}

export default AdminProducts;
