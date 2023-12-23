import React, { useState, useEffect, } from 'react';

import { Form, Input, Button, Select, Upload, DatePicker, Switch, Card, Col, Row, message, Typography, } from 'antd';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import Grid from 'antd/lib/card/Grid';

const { Option } = Select;
const { TextArea } = Input

const CompanyAddress = () => {
    const [form] = Form.useForm();
    //   const { enqueueSnackbar } = useSnackbar();
    const [sellerData, setSellerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const { Text } = Typography;
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        // Union territories
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
        'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
    ];


    // Other state variables...

    // Your schema remains the same
    const UpdateUserSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        // ... add other validations as needed
    });

    useEffect(() => {
        // Fetch seller details and product data here
        // ...

        // Set seller data to form fields
        if (sellerData) {
            form.setFieldsValue({
                first_name: sellerData.first_name || '',
                last_name: sellerData.last_name || '',
                // Set other form fields similarly
            });
        }
    }, [sellerData, form]);

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('Form values:', values); // Add this line
            // Handle form submission, e.g., make an API call with values
            // ...

            //   enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
        } catch (error) {
            //   enqueueSnackbar('Error submitting form!', { variant: 'error' });
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };



    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setLoading(false);
                setImageUrl(imageUrl);
            });
        }
    };


    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };


    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );



    return (
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{}}>
            <Row gutter={16}  justify="space-evenly" >


                <Col xs={24} sm={24} md={24} lg={23} xl={23}>
                    <Card style={{ padding: 10, marginRight: -10, marginLeft: -10, marginBottom: 0 }}>
                    <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="place" label="Place">
                            <Input placeholder="Enter place" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="locality" label="Locality">
                            <Input placeholder="Enter locality" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="city" label="City">
                            <Input placeholder="Enter city" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="landmark" label="Landmark">
                            <Input placeholder="Enter Landmark" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="state" label="State">
                            <Select
                                showSearch
                                placeholder="Select state"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {states.map(state => <Option key={state}>{state}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="pin_code" label="Pincode">
                            <Input type="number" placeholder="Enter pincode" maxLength={6} />
                        </Form.Item>
                    </Col>
                </Row>


                        {/* Buttons */}
                        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" htmlType="submit">
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </Form>
    );



 
};

export default CompanyAddress;
