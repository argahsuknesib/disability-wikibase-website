/*eslint-disable*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Select } from 'antd';
import React, { Fragment } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from "../../components/CustomButtons/Button.js";





const useStyles = makeStyles(styles);
const { Option } = Select;
export default function HeaderLinks(props) {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  let history = useHistory();
  const handleHomeClick = (e) => {
    history.push(`/`)
  }
  const handleSearchClick = (e) => {
    history.push(`/wiki_search`)
  }
  const handleLoginClick = (e) => {
    history.push(`/login`)
  }
  const onLangChange = (e) => {

  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={handleHomeClick}
          aria-label="home navigation link"
        >
          <HomeIcon className={classes.icons} /> Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Fragment>
          <Button
            color="transparent"
            onClick={handleSearchClick}
            className={classes.navLink}
            aria-label="search navigation link"
          >
            <Link to="/wiki_search" color="transparent">
              <SearchIcon className={classes.icons} />
              Search
            </Link>
          </Button>
        </Fragment>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          onClick={handleLoginClick}
          className={classes.navLink}
          aria-label="login navigation link"
        >
          <Link to={`/login`} color="transparent">
            <AccountCircleIcon className={classes.icons} />
            Login
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Select defaultValue="en" aria-label="language select box" style={{ width: 60, marginTop: '0.5rem', marginLeft: '0.5rem' }} onChange={onLangChange}>
          <Option value="en">EN</Option>
          <Option value="fr">FR</Option>
        </Select>
      </ListItem>
    </List>
  );
}
