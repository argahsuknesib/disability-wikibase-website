/*
DOCUMENT UPLOAD COMPONENT
UPLOAD DOCUMENTS TO THE SYSTEM
*/
import { Button, Col, Input, message, Alert, Row, Select, Upload, Form } from 'antd';
import React, { createRef, useEffect, useState } from 'react';
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';
import country from '../../data/country.json';
import language from '../../data/language.json';
import DiswikiApi from '../../services/DiswikiApi';
import './assets/upload.css';

const { Dragger } = Upload;
const { Option } = Select;
const FileUpload = (props) => {
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState('')
    const [isNameAlreadyExist, setIsNameAlreadyExist] = useState(false);
    const [countryList, setCountryList] = useState([])
    const [languageList, setLanguageList] = useState([])
    const documentNameInput = createRef()
    const [form] = Form.useForm();
    useEffect(() => {
        documentNameInput.current.focus();
        getCountryList();
        setLanguageList(language);

    }, []);

    const getCountryList = () => {
        setCountryList(country);
    }
    const handleUpload = (value) => {
        const formData = new FormData();
        // uncomment for multi file
        // fileList.forEach(file => {
        //     formData.append('files[]', file);
        // });
        let file = fileList[0]
        if (!file || !value || !value.documentName || !value.country || !value.language || !value.description) {
            message.warn(`incomplete input`);
        }
        formData.append('file', file);
        formData.append('document_name', value.documentName);
        formData.append('country', value.country);
        formData.append('language', value.language);
        formData.append('description', value.description);

        setUploading(true)
        DiswikiApi.fileUpload(formData)
            .then(res => {
                setUploading(false)
                message.success(`${res.data.filename} file uploaded successfully`);
                fileList.pop()
                setFileList([])
                form.resetFields()
            })
            .catch(err => {
                console.log(err)
                message.error(`Error uploading web content ${err}`);
                form.resetFields()
                setUploading(false)
            })
    };

    const onBlur = () => {
        console.log('blur');
    }

    const onFocus = () => {
        console.log('focus');
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    const uploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)
            form.resetFields()
        },
        beforeUpload: (file) => {
            // setFileList([...fileList, file])
            setFileList([file])
            form.setFieldsValue({
                documentName: file.name.split('.')[0],
            })
            return false
        },
        fileList,

    };
    const renderCountryOption = () => {
        if (countryList.length > 0)
            countryList.map((country, index) => {
                return (<Option key={country.Code} value={country.Code}>{country.Name}</Option>)
            })

    }

    const contentNameOnLeave = (e) => {
        if (e.target.value) {
            DiswikiApi.isDocumentNameExist(e.target.value)
                .then(res => {
                    if (res.data === true) {
                        setIsNameAlreadyExist(true)
                    } else {
                        setIsNameAlreadyExist(false)
                    }
                }).catch(err => {
                    setIsNameAlreadyExist(false)
                    message.error({
                        content: 'Something went wrong ',
                        className: 'custom-class',
                        style: {
                            marginTop: '4vh',
                        },
                    });
                })
        }
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
            xl: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
            xl: { span: 18 },
        },
    };
    return (
        <div >
            <Alert
                message="IMPORTANT"
                description="Don't upload duplicate documents. Respect the warnings.Strictly prohibit from uploading company data or other band contents. Keep the document name as simple as possible and describe it well."
                type="warning"
                showIcon
                style={{ marginBottom: '0.5rem' }}
            />
            <Dragger {...uploadProps} >
                <p className="ant-upload-drag-icon">
                    <UploadOutlined className="focusIcon" tabIndex={0} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Upload the document that needs to be classified by our classifier
                    Support for a single upload. Strictly prohibit from uploading company data or other
                    band files.
                </p>
            </Dragger>

            <Row>
                <Col xl={20} sm={22} xs={24} style={{ marginTop: '1rem' }}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="upload web content form"
                        onFinish={handleUpload}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="documentName"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input content name!',
                                }, {
                                    validator: (_, value) =>
                                        isNameAlreadyExist ? Promise.reject(new Error('Name already exist')) : Promise.resolve(),
                                },
                            ]}
                        >
                            <Input ref={documentNameInput} aria-label="web content name input" placeholder="Blog post" onBlur={contentNameOnLeave} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input content description!',
                                },
                            ]}
                        >
                            <Input aria-label="Content description input" placeholder="Description" />
                        </Form.Item>
                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select content country!',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Select a Country"
                                optionFilterProp="children"
                                aria-label="select country drop down menu"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    (countryList.length > 0) ?
                                        countryList.map((country, index) => (
                                            <Option key={country.Code} value={country.Code}>{country.Name}</Option>
                                        )) : null
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="language"
                            label="Language"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select document language"
                                aria-label="select language drop down menu"
                                optionFilterProp="children"
                                onFocus={e => { }}
                                onBlur={e => { }}
                                onSearch={e => { }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    (languageList.length > 0) ?
                                        languageList.map((lang, index) => (
                                            <Option key={lang.code} value={lang.code}>{lang.name}</Option>
                                        )) : null
                                }
                            </Select>
                        </Form.Item>
                        <Row>
                            <Col xl={4} sm={3} xs={0} ></Col>
                            <Col xl={20} sm={21} xs={24} >
                                <Button type="primary"
                                    htmlType="submit"
                                    disabled={(fileList.length === 0)}
                                    loading={uploading}
                                    style={{ width: '100%', marginTop: '0.3rem' }}
                                    aria-label="upload file button"
                                    shape="round" icon={<CloudUploadOutlined />} size={'default'}>
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Col>
            </Row>
        </div >
    );
}

export default FileUpload;
