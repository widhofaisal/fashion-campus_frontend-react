import { Table } from "antd";

function AdminTable(props) {
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        props.onSetSortedInfo(sorter);
    };

    return <Table columns={props.columns} dataSource={props.data} onChange={handleChange} />
}

export default AdminTable;
