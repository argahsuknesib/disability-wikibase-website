/*
**{ADMIN PRIVILEGE}
UPLOAD REQUEST MANAGEMENT COMPONENT
VIEW ALL UPLOAD REQUEST, APPROVE OR REJECT REQUEST
*/
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { Button, Col, Empty, message, Modal, Popconfirm, Row, Skeleton, Spin, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DiswikiApi from '../../services/DiswikiApi';
const { Title } = Typography;

const UploadRequest = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const [classificationData, setClassificationData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);

    useEffect(() => {
        getFiles();

    }, []);
    const getFiles = () => {
        setTableLoading(true)
        DiswikiApi.getAllPendingWikiEditRequest()
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0)
                        setTableData(res.data)
                }
                setTableLoading(false)
            }).catch(err => {
                message.error({
                    content: 'Internal error : ' + err,
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
                setTableLoading(false)
            })
    }

    const classificationTableColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            key: 'DocumentResultTableID'
        },
        {
            title: 'Paragraph',
            dataIndex: 'paragraph',
            width: '60%',
            key: 'DocumentResultTable_Paragraph'
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            editable: false,
            key: 'DocumentResultTable_Tag',
            render: (_, record) =>
                classificationData.length >= 0 && record.tags && record.tags.length > 0 ? record.tags.map((tag, i) => {
                    return i < record.tags.length - 1 ?
                        (
                            <Chip
                                avatar={<Avatar>T</Avatar>}
                                label={tag.text}
                                key={i + "delelte_tag"}
                                clickable
                                color={(tag.new) ? "secondary" : 'primary'}
                                // deleteIcon={<DoneIcon />}
                                style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                            />) : (
                            <span>
                                <Chip
                                    avatar={<Avatar>T</Avatar>}
                                    label={tag.text}
                                    key={i + "delelte_two_tag"}
                                    clickable
                                    color={(tag.new) ? "secondary" : 'primary'}
                                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                />
                            </span>
                        )

                }) : null,
        },

    ];


    const columns = [
        {
            title: 'User name',
            key: 'user_name_key',
            dataIndex: 'user_name',
        },
        {
            title: 'Document Name',
            key: 'document_name_key',
            dataIndex: 'document_name'
        },
        {
            title: 'Requested time',
            key: 'requested_time_key',
            dataIndex: 'date'
        },
        {
            title: 'Status',
            key: 'request_status',
            dataIndex: 'status'
        },
        {
            title: 'Action',
            key: 'action_button',
            dataIndex: 'action',
            render: (_, record) =>
                tableData.length >= 1 ?
                    getActionButton(record)
                    : null,
        }
    ];

    const onView = (record) => {
        setModalVisible(true);
        if (record) {
            debugger
            DiswikiApi.getClassificationViewResult(record)
                .then(res => {
                    let tbData = []
                    if (res.status === 200 && res.data.length > 0) {
                        res.data.forEach((data, index) => {
                            tbData.push({
                                "classification_id": data.classification_id,
                                "tags": data.tag,
                                "paragraph": data.paragraph,
                                "key": index + "_classification_data",
                                "id": data.id
                            })
                        })
                        setClassificationData(tbData)
                    }

                }).catch(err => {
                    console.log(err)
                })
        }
    }

    const onApprove = (record) => {

        if (record && record.id && record.document_id) {
            setIsUploading(true)
            let payload = {
                'request_id': record.id,
                'document_id': record.document_id,
                'status': 'accepted',
            }
            DiswikiApi.updateUploadRequest(payload)
                .then((res) => {
                    message.success({
                        content: 'Action updated successfully',
                        className: 'custom-class',
                        style: {
                            marginTop: '4vh',
                        },
                    });
                    getFiles();
                    setIsUploading(false)
                })
                .catch((err) => {
                    message.error({
                        content: 'Internal error : ' + err,
                        className: 'custom-class',
                        style: {
                            marginTop: '4vh',
                        },
                    })
                    setIsUploading(false)
                })
        }
    }

    const onReject = (record) => {
        if (record && record.id && record.document_id) {
            let payload = {
                'request_id': record.id,
                'document_id': record.document_id,
                'status': 'rejected',
            }
            setIsUploading(true)
            DiswikiApi.updateUploadRequest(payload)
                .then((res) => {
                    message.success({
                        content: 'Action updated successfully',
                        className: 'custom-class',
                        style: {
                            marginTop: '4vh',
                        },
                    });
                    setIsUploading(false)
                })
                .catch((err) => {
                    message.error({
                        content: 'Internal error : ' + err,
                        className: 'custom-class',
                        style: {
                            marginTop: '4vh',
                        },
                    })
                    setIsUploading(false)
                })
        }
    }

    const getActionButton = (record) => {
        return (
            <Row key={record.id + "action_button_row_key"}>
                <Tooltip title="View" >
                    <Button shape="circle" onClick={e => onView(record)} style={{ color: "green", }} icon={<EyeOutlined />} />
                </Tooltip>
                <Tooltip title="Approve" >
                    <Button shape="circle" onClick={e => onApprove(record)} style={{ color: "green", marginLeft: '0.5rem' }} icon={<CheckCircleOutlined />} />
                </Tooltip>
                {/* <Tooltip title="Delete" style={{ marginLeft: "3rem" }} color={'red'} visible={true} onVisibleChange={e => console.log('')} > */}
                <Popconfirm title="Sure to delete?" onConfirm={() => onReject(record)} >
                    <Button shape="circle" style={{ color: "red", marginLeft: '0.5rem' }} icon={<CloseCircleOutlined />} />
                </Popconfirm>
                {/* </Tooltip> */}

            </Row>

        )
    }



    return (

        (isUploading) ? <Spin size="large" tip="Updating your action...Please wait" /> : <div>
            <Row gutter={[40, 0]}>
                <Col span={20}>
                    <Title level={2}>
                        Upload Request
                    </Title>
                </Col>

            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Table columns={columns} dataSource={tableData} locale={{
                        emptyText: tableLoading ? <Skeleton active={true} /> : tableData.length > 0 ? <Empty /> : <Title level={4}>
                            No Data
                        </Title>
                    }} />
                </Col>
            </Row>
            <div>
                <Modal
                    title="Upload Request"
                    centered
                    visible={modalVisible}
                    style={{ top: -20 }}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    width={1200}
                    height={600}
                >
                    <div>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Table
                                    pagination={{ pageSize: 2 }}
                                    rowClassName={() => 'editable-row'}
                                    bordered
                                    dataSource={classificationData}
                                    columns={classificationTableColumns}
                                />
                            </Grid>
                        </Grid>

                    </div>
                </Modal>
            </div>
        </div>


    );
}

export default UploadRequest;
