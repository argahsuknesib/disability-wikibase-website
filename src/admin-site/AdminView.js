/*
**{USER PRIVILEGE}
MAIN ADMIN LAYOUT
HEADER LAYOUT, SIDEBAR LAYOUT, APP ROUTES
*/
import { EyeOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Layout, Menu, Popover, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import PrivateRouteAdmin from "../config/PrivateRouteAdmin";
import AuthService from '../services/AuthService';
import SideNav from "./layouts/Sidebar";
import DocumentResult from "./pages/DocumentResult";
import Documents from './pages/Documents';
import FileUpload from './pages/FileUpload';
import WebContentUpload from './pages/WebContentUpload';
import ContentUpload from './pages/ContentUpload';
import TrainModel from './pages/TrainModel';
import UploadRequest from './pages/UploadRequest';

const { Header, Sider, Content } = Layout;


const AdminView = (props) => {
    const [collapse, setCollapse] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    useEffect(() => {
        window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
        if (window.sessionStorage.getItem('userName'))
            setLoggedIn(true)
    }, []);
    const loggout = () => {
        AuthService.logout_dis_wiki()
            .then((res) => {
                window.sessionStorage.clear();
                window.location.href = "/"
            })
            .catch(err => {
                window.sessionStorage.clear();
                window.location.href = "/"
            });
    }
    const menu = () => {
        return loggedIn ?
            (
                <Menu onClick={e => { }} tabIndex={0} >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Typography.Text >{window.sessionStorage.getItem('userName')}</Typography.Text>
                    </Menu.Item>
                    <Menu.Item key="2" style={{ marginLeft: '0.5rem' }}>
                        <Button tabIndex={0} type="primary" shape="round" onClick={loggout} style={{ width: '8rem' }} icon={<LoginOutlined />} size={'large'}>Logout</Button>
                    </Menu.Item>
                </Menu >

            ) : (
                <Menu onClick={e => { }}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Input placeholder="username" onChange={e => { }} style={{ width: "10rem" }} />
                    </Menu.Item>
                    <Menu.Item key="2" icon={<EyeOutlined />}>
                        <Input placeholder="password" onChange={e => { }} type="password" style={{ width: "10rem" }} />
                    </Menu.Item>
                    <Menu.Item key="3" style={{ marginLeft: '2.5rem' }}>
                        <Button type="primary" shape="round" onClick={e => { }} style={{ width: '8rem' }} icon={<LoginOutlined />} size={'large'}>Login</Button>
                    </Menu.Item>
                    <Menu.Item key="4" style={{ marginLeft: '3.8rem', width: '10 rem' }}>
                        <Button type="primary" type="link">Sign Up</Button>
                    </Menu.Item>
                </Menu >
            )
    };


    const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    }
    return (
        <Router>
            <Layout>

                <Sider trigger={null} collapsible collapsed={collapse}>
                    <SideNav collapse={collapse} />

                </Sider>
                <Layout>
                    <Header className="siteLayoutBackground" style={{ padding: 0, background: "rgb(6 2 61 / 95%)" }}>
                        <Row>
                            <Col span={1}>
                                {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: handleToggle,
                                    style: { color: "#fff" }
                                })}
                            </Col>
                            <Col xl={18} xs={11}></Col>
                            <Col xl={5} xs={10}>
                                <Space key="menu-2" direction="vertical">
                                    <Button type="secondary" className="user-name" aria-label="user login status" type="link">{(window.sessionStorage.getItem('userName') ? window.sessionStorage.getItem('userName') : 'Not logged in')}</Button>
                                </Space>,
                                <Popover key="menu-3" placement="bottomRight" aria-label="user profile dialog" title={'Login'} content={menu} trigger="click">
                                    <Button shape="circle" type="primary" aria-label="user logout button">
                                        <UserOutlined />
                                    </Button>
                                </Popover>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
                        <Switch>
                            <Route exact path="/admin/files"  >
                                <DocumentResult history={props.history} />
                            </Route>
                            <PrivateRouteAdmin path="/admin/request" component={UploadRequest} />

                            <Route exact path="/admin/upload" history={props.history} >
                                {/* <FileUpload /> */}
                                <ContentUpload />
                            </Route>
                            <Route exact path="/admin/web-upload" history={props.history} >
                                <WebContentUpload />
                            </Route>
                            <Route exact path="/admin/doc-upload" history={props.history} >
                                <FileUpload />
                            </Route>
                            <Route exact path="/admin/training" history={props.history} >
                                <TrainModel />
                            </Route>
                            <Route exact path="/admin" history={props.history} >
                                <Documents />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default AdminView;