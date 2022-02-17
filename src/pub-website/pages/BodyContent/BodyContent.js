// import { Typography } from 'antd';
import React, { useEffect, useState, createRef } from 'react';
import { useHistory } from 'react-router';
import classNames from "classnames";

import Parallax from "../../components/Parallax/Parallax.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import Grid from '@material-ui/core/Grid';
import { Row, Col } from 'antd';
import { Typography } from '@material-ui/core';
import styles from "../../assets/jss/material-kit-react/views/components.js";

// CARD
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

// LIST
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GroupIcon from '@material-ui/icons/Group';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

import { FundProjectionScreenOutlined } from '@ant-design/icons';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import '@fontsource/roboto';
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
const { Title } = Typography;
const searchStyle = makeStyles((theme) => ({
    root: {
        padding: '12px ',
        // marginLeft: '8rem',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        width: '80%',

    },
    aboutCardRoot: {
        maxWidth: 345,
    },
    aboutCardMedia: {
        height: 140,
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    exploreRoot: {
        flexGrow: 1,
    },
    explorePaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    explorePaperLeftText: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    card: {
        root: {
            minWidth: 275,
            textAlign: 'left',
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        media: {
            height: '140'
        }
    }

}));
const useStyles = makeStyles(styles);
const searchInput = createRef();
const BodyContent = (props) => {
    const classes = useStyles();
    const searchCssClass = searchStyle();
    const { ...rest } = props;
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [landingPageData, setLandingPageData] = useState({})
    const [textValues, setTextValues] = useState({ 'keyword': '', 'search': '' })
    useEffect(() => {
        searchInput.current.children[0].focus();
    }, []);

    const handleSearchClick = (event) => {
        if (textValues.search) {
            history.push({
                pathname: '/wiki_search',
                state: { 'keyword': textValues.search }
            })
        }
    }
    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (textValues.search) {
                history.push({
                    pathname: '/wiki_search',
                    state: { 'keyword': textValues.search }
                })
            }
        }
    }
    const handleChange = (event) => {
        setTextValues({ 'search': event.target.value })
    }
    const handleMouseDownPassword = (e) => {

    }
    return (

        <div>
            <Parallax image='/img/cover.jpg'>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title} style={{ marginTop: '30rem', color: 'rgb(250 180 6)', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000' }}>Disability Wiki Project</h1>

                                {/* <h3 className={classes.subtitle} style={{
                                    color: '#006a82', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'
                                }}>
                                    Linked Open Data Project.
                                </h3> */}
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <Typography variant="h4" style={{ fontFamily: 'Roboto', paddingTop: '2rem' }} gutterBottom>
                    Explore the disability rights, conventions and different topics about disability rights based on different countries
                </Typography>
                <Paper component="form" style={{ textAlign: 'center', width: '80%', display: 'inline-block', verticalAlign: ' middle' }} >
                    <FilledInput
                        style={{ width: '100%', backgroundColor: 'white' }}
                        id="standard-adornment-password"
                        type='text'
                        name="search"
                        placeholder="Search Documents, Places, Concepts"
                        value={textValues.search}
                        onChange={handleChange}
                        onClick={handleSearchClick}
                        onKeyDown={handleOnKeyDown}
                        ref={searchInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="search disability wiki"
                                    onClick={handleSearchClick}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Paper>
                <Divider style={{ marginTop: "1rem" }} />
                <div style={{ paddingTop: '3rem' }}>
                    <Row>
                        <Col xs={24} xl={6}>
                            <div style={{ paddingLeft: '1rem', }}>
                                <Card className={classes.aboutCardRoot} style={{ height: '27rem' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.aboutCardMedia}
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <TrackChangesIcon style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                About
                                            </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                The data behind this project is free, open-source linked data that is mainted in Wikibase Project.
                                                It promotes information about disability rights.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} xl={6}>
                            <div >
                                <Card className={classes.aboutCardRoot} style={{ height: '27rem' }}>
                                    <CardActionArea>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <AccessibleForwardIcon style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                Motivation
                                            </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                Human rights monitoring for people with disabilities is in urgent need.
                                                We use a Wikibase for editing, integrating and storing structured disability related data. It includes deliberation between experts in critical disability and health informatics.

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} xl={6}>
                            <div>
                                <Card className={classes.aboutCardRoot} style={{ height: '27rem' }}>
                                    <CardActionArea>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <FundProjectionScreenOutlined style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                Project
                                            </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                Promote the convention and information about disability rights and articles relating experiences from different countries.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} xl={6}>
                            <div >
                                <Card className={classes.aboutCardRoot} style={{ marginRight: '1rem', height: '27rem' }}>
                                    <CardActionArea>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <GroupIcon style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                Team
                                            </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                French-Canadian project with contribution of York University (Canada), University Jean Monnet (France) and The QA Company (France)
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Divider style={{ marginTop: '3rem' }} />
            <div style={{ backgroundColor: '#e8eaed' }}>
                <Row>
                    <Col xs={24} xl={8}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root} style={{ height: '8rem' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '5rem', width: '16rem' }} src='/img/qa company.PNG' />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root} style={{ height: '8rem', }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '5rem' }} src='/img/use-logo.png' />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root} style={{ height: '8rem' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '5rem' }} src='/img/yu-logo.png' />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Col>
                </Row>
                <div style={{ marginTop: "2rem", fontSize: 20 }}>
                    <p>All rihgts reserved to Disability wiki project © 2021-2022 </p>

                </div>
            </div>
            {/* <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a> */}
        </div >


    );


}

export default BodyContent;
