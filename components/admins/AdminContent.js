import { Typography, Button } from "antd";
const { Title } = Typography;

import { PlusOutlined } from "@ant-design/icons";

import styled from "styled-components";
import AdminTable from "../general/AdminTable";

import Link from 'next/link';
import { useRouter } from "next/router";

//Styling components
const ContentBackground = styled.div`
  position: absolute;
  background-color: white;
  left: 14vw;
  width: 84vw;
  min-height: 91vh;
  padding: 10px;
`;

const LeftColumn = styled.div`
  float: left;
`;

const RightColumn = styled.div`
  float: right;
`;

const MainColumn = styled.div`
  padding: 11vh 1vw;
  padding-bottom: 0;
`;

function AdminContent(props) {
  const router = useRouter();

  return (
    <ContentBackground>
      <div>
        <LeftColumn>
          <Title>{props.title}</Title>
        </LeftColumn>
        <RightColumn>
          {props.addButton && (
            <Link href={`${router.route}/add`}>
              <Button
                style={{
                  border: "3px solid darkblue",
                  padding: "3px 5px",
                  borderRadius: "7px",
                }}
                icon={<PlusOutlined />}
              >
                Add New {props.singleWord}
              </Button>
            </Link>
          )}
        </RightColumn>
      </div>
      <MainColumn>
        {props.showTable && (
          <AdminTable columns={props.tableStructure} data={props.tableData} onSetSortedInfo={props.onSetSortedInfo} />
        )}
        {props.children && (
          props.children
        )}
      </MainColumn>
    </ContentBackground>
  );
}

export default AdminContent;
