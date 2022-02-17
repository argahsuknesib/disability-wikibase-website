import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { message } from 'antd';
import React, { useState } from "react";
// @material-ui/core components
import { useHistory } from "react-router-dom";
import AuthService from '../../../services/AuthService';
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardHeader from "../../components/Card/CardHeader.js";
import Button from "../../components/CustomButtons/Button.js";

import FormHelperText from '@material-ui/core/FormHelperText';
const useStyles = makeStyles(styles);



const RegisterPage = (props) => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    let history = useHistory();
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const createUserAlert = (type, msg) => {
        if (type == 'success') {
            message.success({
                content: 'User account created successfully',
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
        else if (type == 'notmatch') {
            message.warn({
                content: 'Passowrd and the confirm password are not same',
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
        else if (type == 'required') {
            message.warn({
                content: 'Invalid or incomplete fields',
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
        else if (type == 'error') {
            message.error({
                content: 'Something went wrong ' + msg,
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
    }
    const handleCreateUser = (e) => {
        e.preventDefault();
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (password !== confirmPassword) {
            setIsPasswordMatch(false)
            createUserAlert("notmatch")
            return
        }
        if (!email.match(emailRegex)) {
            setIsValidEmail(false)
            createUserAlert("required")
            return
        }
        if (userName && password && confirmPassword && email) {
            AuthService.register(userName, email, password)
                .then(res => {
                    window.sessionStorage.setItem("userConfig", JSON.stringify(res.data));
                    window.sessionStorage.setItem("userName", res.data.username);
                    createUserAlert("success")
                    history.push('/admin')
                })
                .catch(err => createUserAlert("error", err))
        } else {

            createUserAlert("required")
        }
    }
    const handleForgotPasswordClick = (e) => {

    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setIsValidEmail(true)
    }
    const handleUserName = (e) => {
        setUserName(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setIsPasswordMatch(true)
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setIsPasswordMatch(true)
    }
    const handleLogoClick = (e) => {
        props.history.push('/')
    }
    const handleClickShowPassword = (e) => {
        setShowPassword(!showPassword);
    }
    const handleClickShowConfirmPassword = (e) => {
        setShowConfirmPassword(!showConfirmPassword);
    }


    return (

        <Card className={classes[cardAnimaton]}>
            <form className={classes.form} onSubmit={handleCreateUser}>
                <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Register User</h2>

                </CardHeader>
                <p className={classes.divider}>Disability Wiki Create-User</p>
                <CardBody>
                    <Input
                        inputProps={{
                            'aria-label': 'Username',
                        }}
                        type='text'
                        style={{ marginTop: '1rem' }}
                        placeholder="User Name"
                        value={userName}
                        onChange={handleUserName}
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
                        inputProps={{
                            'aria-label': 'Email',
                        }}
                        type='email'
                        style={{ marginTop: '1rem' }}
                        placeholder="Email"
                        value={email}
                        error={!isValidEmail}
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
                        id="standard-adornment-password"
                        style={{ marginTop: '1rem' }}

                        inputProps={{
                            'aria-label': 'Password',
                        }}
                        name="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        error={!isPasswordMatch}
                        onChange={handlePasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Input
                        placeholder="Confirm Password"
                        id="standard-adornment-password"
                        style={{ marginTop: '1rem', marginBottom: '1rem' }}
                        name="confirmPassword"
                        inputProps={{
                            'aria-label': 'Confirm Password',
                        }}
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        error={!isPasswordMatch}
                        onChange={handleConfirmPasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleClickShowConfirmPassword}
                                >
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                    <Button aria-label="Create user" simple color="primary" size="lg" type="submit">
                        Create User
                    </Button>
                </CardFooter>
            </form>


        </Card>
    );
}

export default RegisterPage;