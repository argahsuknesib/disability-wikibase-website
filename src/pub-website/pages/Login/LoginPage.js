import React, { useState, createRef, useEffect } from "react";
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { message, Row, Col } from 'antd';
import PropTypes from 'prop-types';

// @material-ui/core components
import { useHistory } from "react-router-dom";
import AuthService from '../../../services/AuthService';
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardHeader from "../../components/Card/CardHeader.js";
import Button from "../../components/CustomButtons/Button.js";
// import Footer from "../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import RegisterPage from './RegisterPage';


const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



const LoginPage = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const userNameInput = createRef()
  let history = useHistory();
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  useEffect(() => {
    userNameInput.current.children[0].focus();
  }, []);
  const loginAlert = (type, msg) => {
    if (type === 'success') {
      message.success({
        content: 'Successfully loged in',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    if (type === 'logout') {
      message.success({
        content: 'Successfully logged out ',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    else if (type === 'required') {
      message.warn({
        content: 'Required valid username and password : ',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    else if (type === 'not-found') {
      message.warn({
        content: 'User not exist, Create a user account ',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    else if (type === 'error') {
      message.error({
        content: 'Something went wrong ' + msg,
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
  }
  const handleLoginClick = (e) => {
    e.preventDefault();
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userName && password && userName.match(emailRegex)) {
      AuthService.login_dis_wiki(userName, password)
        .then(res => {
          if (res.status === 200) {
            window.sessionStorage.setItem("userConfig", JSON.stringify(res.data));
            window.sessionStorage.setItem("userName", res.data.username);
            loginAlert("success")
            history.push('/admin')
          }

        })
        .catch(err => {
          if (err.response && err.response.status === 401)
            loginAlert("not-found")
          else
            loginAlert("error", err)
        })
    } else {
      loginAlert("required")
      if (!password) {
        setIsValidPassword(false)
      }
      if (!userName.match(emailRegex)) {
        setIsValidEmail(false)
      }

    }

  }
  const handleForgotPasswordClick = (e) => {

  }
  const handleEmailChange = (e) => {
    setUserName(e.target.value)
    setIsValidEmail(true)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setIsValidPassword(true)
  }

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <div
        role="img"
        aria-label="people with needs celebrating"
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(/img/cover.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Paper square>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  aria-label="login and register user tabs"
                >
                  <Tab label="Login" aria-label="login tab" />
                  <Tab label="Create" aria-label="create user tab" />
                </Tabs>
              </Paper>
              <TabPanel value={tabValue} index={0}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} onSubmit={handleLoginClick}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h2>Login</h2>

                    </CardHeader>
                    <p className={classes.divider}>Disability Wiki Login</p>
                    <CardBody>
                      <Input
                        inputProps={{
                          'aria-label': 'email',
                        }}
                        error={!isValidEmail}
                        type='text'
                        name="email"
                        ref={userNameInput}
                        style={{ marginTop: '1rem' }}
                        placeholder="Email"
                        value={userName}
                        onChange={handleEmailChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                            >
                              <Email />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Input
                        placeholder="Password"
                        error={!isValidPassword}
                        id="standard-adornment-password"
                        style={{ marginTop: '2rem', marginBottom: '1rem' }}
                        name="Password"
                        inputProps={{
                          'aria-label': 'Password',
                        }}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility button"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleClickShowPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Row>
                        <Col xs={24} xl={8}>

                          <Button simple color="primary" style={{ marginLeft: '-1rem' }} size="lg" aria-label="login" type="submit">
                            Login
                          </Button>
                        </Col>
                        <Col xs={24} xl={10}>

                          <Button simple color="primary" size="lg" aria-label="forgot password" onClick={handleForgotPasswordClick}>
                            Forgot password
                          </Button>
                        </Col>
                      </Row>
                    </CardFooter>
                  </form>
                </Card>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <RegisterPage />
              </TabPanel>

            </GridItem>
          </GridContainer>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;