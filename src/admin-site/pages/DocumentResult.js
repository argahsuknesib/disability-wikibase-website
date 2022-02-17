/*
DOCUMENT CLASSIFICATION RESULT COMPONENT
VIEW CLASSIFICATION RESULT, EDIT RESULT, MAKE UPLOAD REQUEST
*/

import { CloudUploadOutlined, DownOutlined, FileOutlined, SyncOutlined, LinkOutlined } from '@ant-design/icons';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { AutoComplete, Button, Col, Dropdown, Empty, Menu, message, Modal, Popover, Row, Skeleton, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DiswikiApi from '../../services/DiswikiApi';
import './assets/style.css';


const { Option } = AutoComplete;
const { Title } = Typography;

const DocumentResult = () => {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFileListLoading, setIsFileListLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [isClassificationSaved, setIsClassificationSaved] = useState(0);
    const [newTagName, setNewTagName] = useState('');
    const [selectedDocument, setSelectedDocument] = useState({});
    const [glossaryTags, setGlossaryTag] = useState([]);
    const [trainingData, setTrainingData] = useState([]);
    const [tableDataEditLogs, setTableDataEditLog] = useState([]);
    const [selectedGlossary, setSelectedGlossary] = useState({});

    useEffect(() => {
        getDocumentList();
        getGlossaryList()
    }, []);
    const popOverContent = (record) => {
        return (<div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button className="delete-row-button" tabIndex={0} onClick={e => handleDelete(record)} >Yes</Button>
        </div>)
    };
    const columns = [
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
            key: 'DocumentResultTableParagraph'
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'DocumentResultTableTag',
            render: (_, record) =>
                tableData.length >= 0 && record.tags ? record.tags.map((tag, i) => {
                    return i < record.tags.length - 1 ?
                        (
                            <Chip
                                avatar={<Avatar>T</Avatar>}
                                label={tag.text}

                                key={record.id + "_delelte_tag_" + i}
                                onKeyDown={(e) => handleTagKeyEvent(e, record, tag)}
                                clickable
                                color={(tag.new) ? "secondary" : 'primary'}
                                onDelete={e => handleTagDelete(record, tag)}
                                style={{ marginRight: '0.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}
                            />) : (
                            <span>
                                <Chip
                                    avatar={<Avatar>T</Avatar>}
                                    label={tag.text}
                                    key={record.id + "_delelte_two_tag_" + i}
                                    clickable
                                    color={(tag.new) ? "secondary" : 'primary'}
                                    onDelete={e => handleTagDelete(record, tag)}
                                    onKeyDown={(e) => handleTagKeyEvent(e, record, tag)}
                                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}
                                />,
                                <Chip
                                    label="Add Tag"
                                    key={record.id + "_add_tag_" + i}
                                    clickable
                                    icon={<AddBoxIcon />}
                                    variant="outlined"
                                    color="primary"
                                    className="add-chip"
                                    onClick={e => handleTagAdd(record, tag)}
                                    onKeyDown={(e) => handleTagKeyEvent(e, record, tag)}
                                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}
                                />
                            </span>
                        )

                }) : null,
        },
        {
            title: 'Action',
            key: 'DocumentResultTable_Action',
            dataIndex: 'operation',
            render: (_, record) =>
                tableData.length >= 0 ? (
                    <Popover getPopupContainer={triggerNode => triggerNode.parentNode} className="focus-style-div" trigger="[click]" key={record.id + "delete_row_action"} content={popOverContent(record)} title="Confirm delete?" >
                        <Button aria-label="delete row" danger>Delete row</Button>
                    </Popover >
                ) : null,
        },
    ];

    const getFileList = () => {
        return (< Menu className="select-file-body" onClick={handleFileClick} getPopupContainer={triggerNode => triggerNode.parentNode} >{
            fileList.length > 0 ? fileList.map((item, index) => {
                return (item.type === "document") ? (
                    <Menu.Item icon={<FileOutlined />} key={item.key + "file_list"} document={item} disabled={(item.status === 'processing')}>
                        {item.name}
                    </Menu.Item>
                ) : (<Menu.Item icon={<LinkOutlined />} key={item.key + "file_list"} document={item} disabled={(item.status === 'processing')}>
                    {item.name}
                </Menu.Item>)
            }) : <Menu.Item key={'no_file_menu_key'} disabled={true}>
                {"NO FILE"}
            </Menu.Item>
        }</Menu >)
    }


    const getDocumentList = () => {
        setIsFileListLoading(true)
        setTableData([]);
        DiswikiApi.getDocumentListPending()
            .then(res => {
                setFileList(res.data)
                setIsFileListLoading(false)
            }).catch(err => {
                setIsFileListLoading(false)
                message.error({
                    content: 'Error : Please try again later',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
            })
    }

    const getGlossaryList = () => {
        DiswikiApi.getGlossaryListFlat()
            .then(res => {
                setGlossaryTag(res.data)
            }).catch(err =>
                message.error({
                    content: 'Error : Please try again later',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
            )
    }


    const getFileResult = (document) => {
        if (!document) return;
        setTableLoading(true);
        DiswikiApi.getClassificationResult(document.name, document.id)
            .then(res => {
                debugger
                let tbData = []
                if (res.status === 200) {
                    if ('document_id' in res.data[0]) {
                        setIsClassificationSaved(1);
                        res.data.forEach((data, index) => {
                            tbData.push({
                                "document_id": data.document_id,
                                "tags": data.tag,
                                "paragraph": data.paragraph,
                                "key": index + "document_id",
                                "id": data.id
                            })
                        })
                    } else {
                        setIsClassificationSaved(0);
                        res.data.forEach((data, index) => {
                            tbData.push({
                                "tags": data.tag,
                                "paragraph": data.paragraph,
                                "key": index + "_classification_data",
                            })
                        })
                    }
                    setTableData(tbData);
                    setTableLoading(false);
                }
            })
            .catch(err => {
                setIsClassificationSaved(0);
                message.error({
                    content: 'Error : Please try again later',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
                setTableLoading(false);
            })
    }

    const handleClick = () => {
        history.push('/form')
    }

    function handleFileClick(e) {
        if (e.item && e.item.props && e.item.props.document) {
            setSelectedDocument(e.item.props.document)
            getFileResult(e.item.props.document)
        }
    }


    // TAG functions

    const handleTagDelete = (record, tag) => {
        debugger
        const dataSource = [...tableData];
        let index = dataSource.indexOf(record);
        dataSource[index].tags = dataSource[index].tags.filter((item) => item !== tag)
        setTableData(dataSource)
        if (tag.new) {
            let index = tableDataEditLogs.findIndex(elem => elem.type === "add_tag" && elem.row_id === record.id && elem.data === tag.text)
            tableDataEditLogs.splice(index, 1)
            setTableDataEditLog(tableDataEditLogs)
        } else {
            tableDataEditLogs.push({
                'type': 'delete_tag', 'row_id': record.id,
                'data': tag.text
            })
            setTableDataEditLog(tableDataEditLogs)
        }


    }
    const handleTagKeyEvent = (e, record, tag) => {
        if (e.key === 'Enter') {
            const dataSource = [...tableData];
            let index = dataSource.indexOf(record);
            dataSource[index].tags = dataSource[index].tags.filter((item) => item !== tag)
            setTableData(dataSource)
            if (tag.new) {
                let index = tableDataEditLogs.findIndex(elem => elem.type === "add_tag" && elem.row_id === record.id && elem.data === tag.text)
                tableDataEditLogs.splice(index, 1)
                setTableDataEditLog(tableDataEditLogs)
            } else {
                tableDataEditLogs.push({
                    'type': 'delete_tag', 'row_id': record.id,
                    'data': tag.text
                })
                setTableDataEditLog(tableDataEditLogs)
            }
        }
    }
    const handleTagAdd = (record, tag) => {
        setModalVisible(true);
        setSelectedRow(record);
    }
    const handleDelete = (record) => {
        setTableData(tableData.filter((item) => item !== record))
        tableDataEditLogs.push({ 'type': 'delete_row', 'row_id': record.id })
        setTableDataEditLog(tableDataEditLogs)
    };

    const handleTagNameChange = (e) => {
        setNewTagName(e.target.value)
    }
    const changeModalVisibleState = () => {
        setModalVisible(!isModalVisible)
    }
    const handleAddNewTagOk = () => {

        setModalVisible(false)
        if (!newTagName) {
            return
        }
        const dataSource = tableData;
        let index = tableData.indexOf(selectedRow);
        if (newTagName.split("_").pop() === "@") {
            tableData[index].tags.push({ 'text': newTagName.split("_")[0], 'new': true })
            tableDataEditLogs.push({
                'type': 'add_tag', 'row_id': selectedRow.id,
                'data': newTagName.split("_")[0], 'id': selectedGlossary.id
            })
            setTableDataEditLog(tableDataEditLogs)
        }
        else {
            tableData[index].tags.push({ 'text': newTagName, 'new': true })
            trainingData.push({ "paragraph": selectedRow.paragraph, "tag": newTagName })
            tableDataEditLogs.push({ 'type': 'add_tag', 'row_id': selectedRow.id, 'new': 1, 'data': newTagName })
            setTableDataEditLog(tableDataEditLogs)
            setTrainingData(trainingData);
        }
        setNewTagName('')
        setTableData(tableData);
    };

    const handleCancel = () => {
        setModalVisible(false)
    };

    const handleSearch = (value) => {
        setNewTagName(value)
    };
    //TAG FUNCTION

    const handleUploadEdit = (value) => {
        DiswikiApi.uploadWikiEditRequest(selectedDocument).
            then(res => {
                setIsClassificationSaved(0)
                message.success({
                    content: 'Successfully upload request created',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                });
                getDocumentList();
            }).catch(err =>
                message.error({
                    content: 'Error : Please try again later',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
            )
    }
    const handleSaveEdit = (value) => {
        if (!selectedDocument && tableData.length < 1 && tableDataEditLogs.length < 1) {
            return;
        }
        let payload = {
            "edit": {
                'classification_data': tableData,
                'training_data': trainingData,
                'table_edit_log': tableDataEditLogs,
                'is_saved': isClassificationSaved,
            },
            'document': selectedDocument
        }
        DiswikiApi.updateCLassificationEdit(payload).
            then(res => {
                setIsClassificationSaved(1)
                setTableDataEditLog([]);
                message.success({
                    content: 'Successfully saved',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                });
            }).catch(err =>
                message.error({
                    content: 'Error : Please try again later',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
            )

    }
    const handleGlossaryChange = (value, option) => {
        if (option && value.split("_").pop() === "@")
            setSelectedGlossary(option.glossary)
    }
    const refreshFileList = () => {
        getDocumentList()
    }

    return (
        <div>
            <Row >
                <Col xl={18} xs={24}>
                    <Title level={2}>
                        Results
                    </Title>
                </Col>
                <Col xl={4} xs={24}>
                    <Dropdown.Button overlay={getFileList} className="ant-btn-custom" aria-label="select file menu" getPopupContainer={triggerNode => triggerNode.parentNode} trigger={['click']} >
                        <a className="ant-dropdown-link" onClick={e => handleFileClick(e)}>
                            Select file <DownOutlined />
                        </a>
                    </Dropdown.Button>
                    <Button
                        type="primary"
                        style={{ marginLeft: '0.5rem' }}
                        icon={<SyncOutlined spin={isFileListLoading} />}
                        aria-label="refresh document list"
                        onClick={() => refreshFileList()}
                    />
                </Col>
            </Row>
            <Row >
                <Col xl={3} xs={24}>
                    <Button
                        className="ant-btn-custom"
                        onClick={handleSaveEdit}
                        aria-label="save edits"
                        disabled={tableData.length < 1}
                    >
                        Save Edits
                    </Button>
                </Col>
                <Col xl={2} xs={24}>
                    <Button type="primary" disabled={tableData.length < 1} aria-label="upload results to wikibase" onClick={handleUploadEdit} shape="round" icon={<CloudUploadOutlined />} size={'default'}>
                        Uploads to Wikibase
                    </Button>
                </Col>
            </Row>
            <Row >
                <Col xl={24} xs={24} style={{ marginTop: '1rem' }}>
                    <Table
                        pagination={{ pageSize: 2 }}
                        rowClassName={() => 'editable-row'}
                        bordered
                        locale={{
                            emptyText: tableLoading ? <Skeleton active={true} /> : tableData.length > 0 ? <Empty /> : <Title level={4}>
                                No Data
                            </Title>
                        }}
                        dataSource={tableData}
                        columns={columns}
                    />
                </Col>
            </Row>
            <Modal title="Add new tag" aria-label="add new tag dialog" visible={isModalVisible} onOk={handleAddNewTagOk} onCancel={handleCancel}>

                <AutoComplete style={{ width: '100%' }} onSearch={handleSearch}
                    allowClear
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onChange={handleSearch}
                    onSelect={handleGlossaryChange}
                    placeholder="input here">
                    {(glossaryTags.length > 0) ? glossaryTags.map((glossary, i) => (
                        <Option key={i + "glossary_list"} glossary={glossary} value={glossary.label + "_@"}>
                            {glossary.label}
                        </Option>
                    )) : null}
                </AutoComplete>
            </Modal>
        </div>
    );
}

export default DocumentResult;
