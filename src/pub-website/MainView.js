import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react';
import {
    Route,
    // HashRouter as Router,
    Switch, useHistory, useRouteMatch
} from "react-router-dom";
import styles from "./assets/jss/material-kit-react/views/components.js";
import BodyContent from "./pages/BodyContent/BodyContent";
import Header from "./pages/Header/Header";
import HeaderLinks from "./pages/Header/HeaderLinks";
import LoginPage from './pages/Login/LoginPage';
import QASearch from './pages/SearchResult/QASearch';




function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
const { Title } = Typography;
const searchStyle = makeStyles((theme) => ({
    root: {
        padding: '12px ',
        marginLeft: '8rem',
        display: 'flex',
        alignItems: 'center',
        width: '80%',

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

const MainView = (props) => {
    const { path, url } = useRouteMatch();
    const classes = useStyles();

    const searchCssClass = searchStyle();
    const { ...rest } = props;
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [landingPageData, setLandingPageData] = useState({})
    const [textValues, setTextValues] = useState({ 'keyword': '', 'search': '' })
    useEffect(() => {

    }, []);

    const handleSearchClick = (event) => {

        if (textValues.search) {
            props.history.push({
                pathname: '/wiki_search',
                state: { 'keyword': textValues.search }
            })
        }
    }

    const handleChange = (event) => {
        setTextValues({ 'search': event.target.value })
    }
    return (

        <div>
            <Header
                brand="DISABILITY WIKI"
                rightLinks={<HeaderLinks />}
                fixed
                color={(window.location.href.split('/')[3] === "") ? "transparent" : 'white'}
                changeColorOnScroll={{
                    height: 400,
                    color: 'white'
                }}
                {...rest}
            />
            <Switch>
                <Route exact path={`/`}><BodyContent /> </Route>
                <Route exact path="/login">< LoginPage /></Route>
                <Route exact path='/wiki_search' component={QASearch} />
            </Switch>
        </div >
    );
}

export default MainView;
