import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

import { Typography, Form, Input, InputNumber, Select, Upload, Button, notification } from "antd";
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

import { useRouter } from "next/router";

import styled from "styled-components";

import { productFormStructure, productCategoryFormStructure } from "../../SystemConfig";

import { EndPoint, Categories, ProductsList } from "../../SystemApis";

//Styling components
const ContentBackground = styled.div`
  position: absolute;
  background-color: white;
  top: 9vh;
  left: 16vw;
  width: 84vw;
  min-height: 91vh;
  padding: 10px;
`;

const LeftColumn = styled.div`
  clear: left;
`;

const MainColumn = styled.div`
  padding: 11vh 1vw;
  padding-bottom: 0;
`;

const ButtonSubmit = styled(Button)`
    margin-left: 6vw;
    width: 10vw;
`;

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 10,
    },
};


function AdminFormContent(props) {
    const router = useRouter();
    //const linkName = router.route.split('/')[2];
    const formType = props.fId == 'add' ? 'Add' : 'Edit'
    const buttonText = props.fId == 'add' ? 'Create' : 'Edit'
    let formItems = [];
    const [catOpts, setCatOpts] = useState([]);

    const [form] = Form.useForm();
    const [tmpVar, setTmpVar] = useState([]);
    const [fileList, setFileList] = useState([]);

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                //console.log("Called", reader);
                baseURL = reader.result;
                //console.log(baseURL);
                resolve(baseURL);
            };
            //console.log(fileInfo);
        });
    };

    const getPicturesText = files => {
        return new Promise(resolve => {
            //console.log(files);
            //Get all images
            let picturesUpload = [];

            files.forEach(picture => {
                if(picture.url){
                    picturesUpload.push(picture.url.substr(EndPoint.length));
                }
                if (typeof picture.originFileObj == "object") {
                    getBase64(picture.originFileObj).
                        then(result => {
                            picturesUpload.push(result);
                        }).
                        finally(() => {
                            //console.log(picturesUpload);
                            //console.log("ori: " + files.length);
                            //console.log("transform: " + picturesUpload.length);

                            if (files.length == picturesUpload.length) {
                                //console.log("IN INside")
                                resolve(picturesUpload);
                            }
                        })
                }
            });

            if (files.length == picturesUpload.length) {
                //console.log("IN OUTside")
                resolve(picturesUpload);
            }
        });
    }

    useEffect(() => {
        //console.log(props.fId);
        if (props.fId != 'add' && props.fKey == "productCategory") {
            var ids = props.fId.split("-")
            setTmpVar([ids.slice(0,-1).join("-"), ids[ids.length-1]]);
            form.setFieldsValue({
                title: ids[ids.length-1]
            });
        } else if (props.fId != 'add' && props.fKey == "product") {
            setTmpVar(props.fId);
            fetch(EndPoint + ProductsList + "/" + props.fId, {
                headers: {
                    'Authentication': getCookie("adminToken")
                }
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data.data)
                    const getDataInit = data.data;

                    //get pictures
                    let pictures = [];
                    getDataInit.images_url.forEach(imgTmp => {
                        pictures.push({
                            name: EndPoint + imgTmp,
                            url: EndPoint + imgTmp
                        });
                    });
                    setFileList(pictures);

                    form.setFieldsValue({
                        name: getDataInit.title,
                        price: getDataInit.price,
                        description: getDataInit.product_detail,
                        category: getDataInit.category_id,
                        condition: getDataInit.condition,
                    });
                });
        }

        if (props.fKey == "product") {
            fetch(EndPoint + Categories, {
                headers: {
                    'Authentication': getCookie("adminToken")
                }
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data.data)
                    setCatOpts(data.data);
                });
        }
    }, [form]);

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const fieldType = (formItem) => {
        const attrs = {
            label: formItem[0],
            name: formItem[1],
        }

        if (formItem[3] != "none") attrs.rules = formItem[3];

        if (formItem[2] == "text") {
            return (
                <Form.Item {...attrs}>
                    <Input />
                </Form.Item>);
        }
        else if (formItem[2] == "number") {
            return (
                <Form.Item {...attrs}>
                    <InputNumber />
                </Form.Item>);
        }
        else if (formItem[2] == "multilineText") {
            return (
                <Form.Item {...attrs}>
                    <TextArea />
                </Form.Item>);
        }
        else if (formItem[2] == "selectBox") {
            return (
                <Form.Item {...attrs}>
                    <Select placeholder={`Please choose ${props.fKey} ${formItem[1]}`}>
                        {formItem[1] != "category" && formItem[4].map(item => {
                            return (<Option key={item} value={item}>{capitalizeFirstLetter(item)}</Option>)
                        })}
                        {formItem[1] == "category" && catOpts.map(item => {
                            return (<Option key={item.id} value={item.id}>{capitalizeFirstLetter(item.title)}</Option>)
                        })}
                    </Select>
                </Form.Item>);
        }
        else if (formItem[2] == "uploadImage") {
            return (
                <Form.Item {...attrs}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChangePicture}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>);
        }
    }

    const onFinish = async (values) => {
        //console.log('Received values of form:', values);
        if (props.fKey == "productCategory") {
            if (props.fId == "add") {
                fetch(EndPoint + Categories, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authentication': getCookie("adminToken")
                    },
                    body: JSON.stringify({
                        category_name: values.title,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        notification.open({
                            description: data.message
                        })

                        setTimeout(function () {
                            router.push('/admin/productCategories');
                        }, 5000);
                    });

            } else {
                fetch(EndPoint + Categories + "/" + tmpVar[0], {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authentication': getCookie("adminToken")
                    },
                    body: JSON.stringify({
                        category_name: values.title,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        notification.open({
                            description: data.message
                        })

                        setTimeout(function () {
                            router.push('/admin/productCategories');
                        }, 5000);
                    });
            }
        }
        else if (props.fKey == "product") {
            const getPicturesFromForm = fileList;

            const pictureToText = await getPicturesText(getPicturesFromForm);

            //console.log(pictureToText)

            if (props.fId == "add") {
                fetch(EndPoint + ProductsList, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authentication': getCookie("adminToken")
                    },
                    body: JSON.stringify({
                        product_name: values.name,
                        description: values.description,
                        price: values.price,
                        category: values.category,
                        condition: values.condition,
                        images: pictureToText
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        notification.open({
                            description: data.message
                        })

                        setTimeout(function () {
                            router.push('/admin/products');
                        }, 5000);
                    });
            } else {
                //console.log(tmpVar[0]);
                fetch(EndPoint + ProductsList, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authentication': getCookie("adminToken")
                    },
                    body: JSON.stringify({
                        product_id: tmpVar,
                        product_name: values.name,
                        description: values.description,
                        price: values.price,
                        category: values.category,
                        condition: values.condition,
                        images: pictureToText
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        notification.open({
                            description: data.message
                        })

                        setTimeout(function () {
                            router.push('/admin/products');
                        }, 5000);
                    });
            }
        }
    };

    const handleChangePicture = ({ fileList: newFileList }) => setFileList(newFileList);



    if (props.fKey == "productCategory") {
        productCategoryFormStructure.forEach(formItem => {
            formItems.push(fieldType(formItem));
        })
    } else if (props.fKey == "product") {
        productFormStructure.forEach(formItem => {
            formItems.push(fieldType(formItem));
        })
    }

    return (
        <ContentBackground>
            <div>
                <LeftColumn>
                    <Title>{capitalizeFirstLetter(props.fType)} {formType} Form</Title>
                </LeftColumn>
                <MainColumn>
                    <Form
                        form={form}
                        name="adminForm"
                        {...layout}
                        onFinish={onFinish}
                    >
                        {formItems}
                        <Form.Item>
                            <ButtonSubmit type="primary" htmlType="submit">{buttonText}</ButtonSubmit>
                        </Form.Item>
                    </Form>
                </MainColumn>
            </div>
        </ContentBackground>
    );
}

export default AdminFormContent;