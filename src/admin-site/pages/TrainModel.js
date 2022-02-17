/*
FEEDBACK MANAGEMENT COMPONENT
VIEW ALL FEEDBACK AND TRAIN THE MODEL
*/
import { makeStyles } from '@material-ui/core/styles';
import { Button, Col, Divider, message, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DiswikiApi from '../../services/DiswikiApi';

const { Title } = Typography;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const TrainModel = () => {
    const classes = useStyles();
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        getTrainingData();

    }, []);
    const getTrainingData = () => {
        DiswikiApi.getTrainginData()
            .then(res => {
                setTableData(res.data);
            }).catch(err => {
                message.error({
                    content: 'Internal error : ' + err,
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id_title_key',
            responsive: ["xs", "xl"]
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag_title_key',
            responsive: ["xs", "xl"]
        },
        {
            title: 'Paragraph',
            dataIndex: 'paragraph',
            key: 'paragraph_title_key',
            responsive: ["xs", "xl"]
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status_title_key',
            responsive: ["xl"]
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onKeyPress: (e) => {
            debugger
        },
        getCheckboxProps: (record) => ({
            // disabled: record.status === 'Failed',
            // name: record.label,
        }),
    };

    return (
        <div>
            <Row>
                <Col xs={24} xl={4}>
                    <Title level={2} aria-label="train data title">
                        Training Data
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col xs={24} xl={2}>
                    <Button
                        shape="round"
                        style={{
                            marginBottom: 16,
                        }}
                        aria-label="train button"
                    >
                        Train
                    </Button>
                </Col>
                <Col xs={24} xl={4}>
                    <Button danger shape="round" aria-label="remove selected feedback button" size={'default'}>
                        Remove selected
                    </Button>
                </Col>
                <Col xs={24} xl={18}>
                </Col>
            </Row>

            <Divider />
            <Row >
                <Col xs={24} xl={24}>
                    {tableData.length > 0 ? <Table aria-label="feedback table" rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                        columns={columns}
                        onRow={(record) => ({
                            onClick: () => {
                                // this.selectRow(record);
                            },
                            onKeyPress: (e) => {
                                if (e.target.className === "ant-checkbox-input" && e.key === "Enter") {
                                    e.target.click();
                                }
                            }
                        })}
                        dataSource={tableData} /> :
                        <Title level={4}>
                            No Data
                        </Title>}
                </Col>
            </Row>

        </div>
    );
}

export default TrainModel;
