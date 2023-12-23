import React, { useState, useEffect, } from 'react';

import { Form, Input, Button, Select, Upload, DatePicker, Switch, Card, Col, Row, message, Typography, } from 'antd';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Address from './Address';
// import Grid from 'antd/lib/card/Grid';

const { Option } = Select;
const { TextArea } = Input

const BuyerDetail = () => {
    const [form] = Form.useForm();
    //   const { enqueueSnackbar } = useSnackbar();
    const [BuyerData, setBuyerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const { Text } = Typography;


    // Other state variables...

    // Your schema remains the same
    const UpdateUserSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        // ... add other validations as needed
    });

    useEffect(() => {
        // Fetch Buyer details and Buyer data here
        // ...

        // Set Buyer data to form fields
        if (BuyerData) {
            form.setFieldsValue({
                first_name: BuyerData.first_name || '',
                last_name: BuyerData.last_name || '',
                // Set other form fields similarly
            });
        }
    }, [BuyerData, form]);

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
        <Col>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{}}>
            <Row gutter={16}  justify="space-evenly" >


                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                    <Card style={{ textAlign: 'center', padding: 10, marginRight: 1, marginLeft: -10,  }}>
                        <Form.Item name="profile_photo" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Row gutter={16}>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} >

                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}

                                    >
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="avatar" style={{ border: '1px solid black ', borderRadius: '50%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                                        ) : (
                                            <div style={{ border: '1px solid black ', borderRadius: '50%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {uploadButton}
                                            </div>
                                        )}
                                    </Upload>
                                </Col>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} style={{ marginTop: 6 }} >
                                    <Text type='secondary'  >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        {/* <br /> max size of {fData(3145728)} */}
                                        <br /> max size of 2MB
                                    </Text>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <Card style={{ padding: 10, marginRight: -10, marginLeft: -10, marginBottom: 0 }}>
                        <Row gutter={16}>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'First Name is required' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Last Name is required' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="Buyers_deal_in" label="Buyers Deal In">
                                    <Select mode="multiple" placeholder="Select Buyers...">
                                        {/* Map and render options */}
                                        <Option value={'ss'}>{'BuyerName'}</Option>
                                        <Option value={'ss1'}>{'BuyerName1'}</Option>
                                        <Option value={'ss2'}>{'BuyerNam3e'}</Option>
                                        <Option value={'ss4'}>{'BuyerName4'}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="year_of_experience" label="Year Of Experience">
                                    <Input type="number"  min={1} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Other form fields */}
                        {/* ... */}

                        {/* Example: Select for Buyers */}
                        {/* <Form.Item name="company_description" label="Company Description">
                            <TextArea rows={4} />
                        </Form.Item> */}




                        {/* Example: DatePicker */}
                        <Row gutter={[16, 16]}>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="dob" label="Date of Birth">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="Joining Date" label="Joining Date">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="pan_card" label='Upload Pan card' valuePropName="PanCard" >
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture"
                                        maxCount={1}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                                <Form.Item name="aadhar_card" label='Upload Aadhaar ' valuePropName="aadhaar" >
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture"
                                        maxCount={1}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>



                        {/* Example: Switch for Is Verified */}
                        <Form.Item name="is_verified" label="Is Verified" valuePropName="checked">
                            <Switch />
                        </Form.Item>

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
        <Col style={{marginTop:'8vh', marginBottom:'20vh'}}>  
                <Address/>
        </Col>
        </Col>
    );


};

export default BuyerDetail;
