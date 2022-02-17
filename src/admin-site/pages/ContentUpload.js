/*
DOCUMENT UPLOAD COMPONENT
UPLOAD DOCUMENTS TO THE SYSTEM
*/
import React, { createRef, useEffect, useState } from 'react';
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Input, message, Row, Select } from 'antd';
import country from '../../data/country.json';
import language from '../../data/language.json';
import DiswikiApi from '../../services/DiswikiApi';
import { makeStyles } from '@material-ui/core/styles';
import './assets/upload.css';
import Paper from '@material-ui/core/Paper';
// CARD
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import LanguageIcon from '@material-ui/icons/Language';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({

    cardHover: {
        '&:hover': {
            color: 'blue',
        },
    }
}));
const ContentUpload = (props) => {
    const history = useHistory();
    const classes = useStyles();
    useEffect(() => {

    }, []);

    const handleWebClick = (e) => {
        e.preventDefault();
        history.push('/admin/web-upload');
    }

    const handleDocumentClick = (e) => {
        e.preventDefault();
        history.push('/admin/doc-upload');
    }
    return (
        <Row >
            <Col xs={0} xl={6}></Col>
            <Col xs={24} xl={6}>
                <div style={{ paddingLeft: '1rem', }}>
                    <Card aria-label="block post upload" onClick={e => handleWebClick(e)} className={classes.cardHover} style={{ height: '27rem', cursor: 'pointer' }}>
                        <CardActionArea>

                            <CardContent style={{ textAlign: 'center' }}>
                                <LanguageIcon style={{ fontSize: '5rem' }} />
                                <Typography gutterBottom variant="h4" component="h2">
                                    WEB CONTENT
                                </Typography>
                                <Typography variant="h6" color="textPrimary" >
                                    Extract contents directly from a blog post or a website
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </Col>
            <Col xs={24} xl={6}>
                <div style={{ paddingLeft: '1rem', }}>
                    <Card onClick={e => handleDocumentClick(e)} aria-label="document upload" className={classes.cardHover} style={{ height: '27rem' }}>
                        <CardActionArea>

                            <CardContent style={{ textAlign: 'center' }}>
                                <MenuBookIcon style={{ fontSize: '5rem' }} />
                                <Typography gutterBottom variant="h4" component="h2">
                                    DOCUMENT
                                </Typography>
                                <Typography variant="h6" color="textPrimary" >
                                    Extract contents from free text documents (.doc, .pdf, .rtf).
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </Col>
        </Row>


    );
}

export default ContentUpload;
