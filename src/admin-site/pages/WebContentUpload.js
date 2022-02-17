/*
DOCUMENT UPLOAD COMPONENT
UPLOAD DOCUMENTS TO THE SYSTEM
*/
import React, { createRef, useEffect, useState } from 'react';
import { Select } from 'antd';
import { AudioOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Card, Col, Button, Form, Input, Alert, Menu, Row, Typography, message, Modal } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EditIcon from '@material-ui/icons/Edit';
import DiswikiApi from '../../services/DiswikiApi';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import country from '../../data/country.json';
import language from '../../data/language.json'
const { Option } = Select;
const useStyles = makeStyles((theme) => ({

    cardHover: {
        '&:hover': {
            color: 'blue',
        },
    }
}));
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const WebContentUpload = (props) => {
    const classes = useStyles();
    const searchInput = createRef();
    const [paragraphs, setParagraphs] = useState([])
    const [uploading, setUploading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isNameAlreadyExist, setIsNameAlreadyExist] = useState(false);
    const [contentLink, setContentLink] = useState('')
    const [countryList, setCountryList] = useState([])
    const [languageList, setLanguageList] = useState([])
    const documentNameInput = createRef()
    const [form] = Form.useForm();
    useEffect(() => {
        searchInput.current.focus();
        setLanguageList(language);
        setCountryList(country);
    }, []);

    const onSearch = (value) => {
        if (value) {
            setContentLink(value)
            DiswikiApi.getWebContents(value).then
                (res => {
                    setParagraphs(res.data)
                })
                .catch(err => {
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
    const viewContentLinks = (paragraph) => {

    }
    const handleModalOkClick = () => { setModalVisible(false) }
    const handleCancelClick = () => { setModalVisible(false) }
    const deleteContent = (paragraph) => {
        let newParagraphs = paragraphs.filter(p => p.id !== paragraph.id)
        setParagraphs(newParagraphs)
    }
    const mergeContent = (paragraph) => {
        let newParagraphs = [...paragraphs]
        let index = paragraphs.findIndex(p => p.id === paragraph.id)
        let nextParagraph = paragraphs[Number(index) + 1]
        if (nextParagraph) {
            nextParagraph.text = paragraph.text + " " + nextParagraph.text
            newParagraphs.splice(index, 2, nextParagraph)
            setParagraphs(newParagraphs)
        }
    }
    const paragraphTextChange = (e, paragraph) => {
        let newParagraphs = paragraphs.map(p => { return (p.id === paragraph.id) ? { ...p, 'text': e.target.value } : p })
        setParagraphs(newParagraphs)
    }
    const handleUpload = (value) => {
        if (!value.documentName || !value.country || !value.language || !value.description) {
            return;
        }
        setUploading(true)
        let doc = {
            'document_name': value.documentName,
            'country': value.country,
            'language': value.language,
            'description': value.description,
            'link': contentLink
        }
        let payload = {
            'document': doc, 'paragraphs': paragraphs
        }
        DiswikiApi.webContentUpload(payload)
            .then(res => {
                setUploading(false)
                message.success(`${res.data.filename} web content uploaded successfully`);
                form.resetFields()
                setModalVisible(false)
            })
            .catch(err => {
                message.error(`Error uploading web content ${err}`);
                form.resetFields()
                setUploading(false)
                setModalVisible(false)
            })

    }
    const handlePreUpload = () => {
        setModalVisible(true)
    }
    const renderAction = (paragraph, i) => {
        return (
            <React.Fragment>
                <Tooltip title="Delete" key={i + "delete icon tooltip"} aria-label="delete action">
                    <IconButton onClick={e => deleteContent(paragraph)} key={i + "delete icon button"} aria-label="delete icon button" className={classes.margin} size="small">
                        <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Merge content" key={i + "merge icon tooltip"} aria-label="merge action">
                    <IconButton onClick={e => mergeContent(paragraph)} key={i + "merge icon button"} aria-label="merge content icon button" className={classes.margin} size="small">
                        <PlaylistAddIcon style={{ color: "green" }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Show hyperlinks" key={i + "show links icon tooltip"} aria-label="show hyperlinks action">
                    <IconButton onClick={e => viewContentLinks(paragraph)} key={i + "view link icon button"} aria-label="show links icon button" className={classes.margin} size="small">
                        <LinkIcon style={{ color: "black" }} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }
    const renderTextAnswer = () => {
        return (
            <React.Fragment>
                {paragraphs.length > 0 ? paragraphs.map((paragraph, i) => (
                    (paragraph.text && paragraph.text.length > 0) ?
                        <Row style={{ border: '2px solid rgb(24 144 255)', marginTop: "0.3rem" }}>
                            <Col xs={24} xl={19}>
                                <div >
                                    <Card hoverable key={i + "_content_area"} bordered={false} style={{ width: '100%' }}>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Multiline"
                                            aria-label="paragraph text box"
                                            multiline
                                            maxRows={4}
                                            style={{ width: '100%' }}
                                            value={paragraph.text}
                                            onChange={e => paragraphTextChange(e, paragraph)}
                                        />
                                    </Card>
                                </div>
                            </Col>
                            <Col xs={24} xl={5} >
                                <div style={{ marginLeft: '1rem', textAlign: 'left' }}>
                                    <Card title="Action" key={i + "_action_area"} bordered={false} style={{ width: '100%' }}>
                                        {renderAction(paragraph, i)}
                                    </Card>
                                </div>
                            </Col>
                        </Row> : null
                )) : null}
            </React.Fragment>
        )
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
        <React.Fragment>
            <Row >
                <Col xs={0} xl={2} />
                <Col xs={24} xl={20}>
                    <Input.Search
                        placeholder="enter the url to extract"
                        allowClear
                        enterButton="Search"
                        name="Search"
                        size="large"
                        aria-label='web url input'
                        suffix={suffix}
                        ref={searchInput}
                        style={{ marginTop: -4 }}
                        onSearch={onSearch}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={24} xl={24}>
                    <Button type="primary" onClick={handlePreUpload}
                        disabled={(paragraphs.length === 0)}
                        aria-label="view upload configuration button"
                        style={{ marginTop: 16 }}
                        shape="round" icon={<CloudUploadOutlined />} size={'default'}>
                        {'Upload'}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={0} xl={2} />
                <Col xs={24} xl={20} style={{ marginTop: '4rem' }}>
                    {renderTextAnswer()}
                </Col>
            </Row>
            {/* MODAL */}
            <Modal title="Upload content" aria-label="upload web content modal" visible={isModalVisible} onOk={handleModalOkClick} onCancel={handleCancelClick}>
                {/* MODAL BODY */}
                <Alert
                    message="IMPORTANT"
                    description="Don't upload duplicate web content. Respect the warnings. Strictly prohibit from uploading company data or other
                    band contents. Keep the content name as simple as possible and describe it well."
                    type="warning"
                    showIcon
                    style={{ marginBottom: '0.5rem' }}
                />
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

                        <Col xl={24} xs={24} >
                            <Button type="primary"
                                // onClick={handleUpload}
                                htmlType="submit"
                                disabled={(paragraphs.length === 0)}
                                loading={uploading}
                                style={{ width: '100%', marginTop: '0.3rem' }}
                                aria-label="upload contents button"
                                shape="round" icon={<CloudUploadOutlined />} size={'default'}>
                                {uploading ? 'Uploading' : 'Upload'}
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </React.Fragment>

    );
}

export default WebContentUpload;
