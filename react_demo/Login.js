import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Popup from 'react-popup';

import { authenticateAdmin , authenticateCoach , sendForgetMail } from '../api/auth/Auth';
import Config from "../config";

const cookies = new Cookies();
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fe_admin:"",
            fe_coach:""
        };

        this.loginAdmin = this.loginAdmin.bind(this);
        this.loginCoach = this.loginCoach.bind(this);
        this.sendForgetEmail = this.sendForgetEmail.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    loginAdmin()
    {
        var username = document.getElementById('admin-username').value;
        var password = document.getElementById('admin-password').value;
        var history = this.props.history;
        authenticateAdmin(username,password).then(function (res) {
            if(res.status == 200)
            {
                var expiryTime = Config.getTokenExpiry();
                cookies.set('token', res.token, {expires:expiryTime});
                cookies.set('userType', 1, {expires:expiryTime});
                if(document.getElementById('admin-remember').checked)
                {
                    cookies.set('au',document.getElementById('admin-username').value);
                    cookies.set('ap',document.getElementById('admin-password').value);
                }
                else
                {
                    cookies.remove('au');
                    cookies.remove('ap');
                }
                history.push('/admin/add-package');
            }
            else
            {
                Popup.alert(res.message);
            }
        });
    }
    loginCoach()
    {
        var email = document.getElementById('coach-email').value;
        var password = document.getElementById('coach-password').value;
        var history = this.props.history;
        authenticateCoach(email,password).then(function (res) {
            if(res.status == 200)
            {
                var expiryTime = Config.getTokenExpiry();
                cookies.set('token', res.token, {expires:expiryTime});
                cookies.set('userType', 0, {expires:expiryTime});
                if(document.getElementById('coach-remember').checked)
                {
                    cookies.set('cu',document.getElementById('coach-email').value);
                    cookies.set('cp',document.getElementById('coach-password').value);
                }
                else
                {
                    cookies.remove('cu');
                    cookies.remove('cp');
                }
                history.push('/coach/home');
            }
            else
            {
                Popup.alert(res.message);
            }
        });
    }
    sendForgetEmail(e)
    {
        var feData = {};
        if(e.target.name == 'admin')
            feData = {email:this.state.fe_admin,userType:'admin'};
        else if(e.target.name == 'coach')
            feData = {email:this.state.fe_coach,userType:'coach'};
        sendForgetMail(feData).then(function (res) {
            Popup.alert(res.message);
            if(res.status == 200){
                document.getElementById('forgotModalAdminClose').click();
                document.getElementById('forgotModalCoachClose').click();
            }
        });
    }
    componentDidMount()
    {
        if(cookies.get('au') != null && cookies.get('ap') != null){
            document.getElementById('admin-username').value = cookies.get('au');
            document.getElementById('admin-password').value = cookies.get('ap');
            document.getElementById('admin-remember').checked = 'true';
        }
        if(cookies.get('cu') != null && cookies.get('cp') != null){
            document.getElementById('coach-email').value = cookies.get('cu');
            document.getElementById('coach-password').value = cookies.get('cp');
            document.getElementById('coach-remember').checked = 'true';
        }
    }
    render() {
        return (
            <div className="col-xs-5 login">
                <img className="img-responsive logo" src="images/logo.png" />
                <div className="panel panel-login col-xs-12">
                    <div className="panel-heading col-xs-12">
                        <div className="col-xs-6 role">
                            <a href="javascript:;" className="active" id="login-form-link">Admin</a>
                        </div>
                        <div className="col-xs-6 role">
                            <a href="javascript:;" id="register-form-link">Coach</a>
                        </div>
                    </div>
                    <div className="panel-body col-xs-12">
                        <div className="row">
                            <div className="col-xs-12 form">
                                <div id="login-form">
                                    <div className="field col-xs-12 line-l">
                                        <input type="text" name="name" placeholder="Username" id="admin-username" />
                                            <i className="fa fa-user"></i>
                                    </div>
                                    <div className="field col-xs-12">
                                        <input type="password" name="name" placeholder="Password" id="admin-password" />
                                            <i className="fa fa-lock"></i>
                                    </div>
                                    <div className="check col-xs-12">
                                        <label className="control control--checkbox">Remember Me
                                            <input type="checkbox" id="admin-remember" />
                                            <div className="control__indicator"></div>
                                        </label>
                                    </div>
                                    <div className="col-xs-12 button">
                                        <button className="btn" onClick={this.loginAdmin} id="admin-login-btn">Login</button>
                                    </div>
                                    <a type="button" id="forgotModalAdminLink" data-toggle="modal" data-target="#forgotModalAdmin"><h5>Forgot Password ?</h5></a>
                                </div>
                                <div id="register-form" hidden>
                                    <div className="field col-xs-12 line-l">
                                        <input type="text" name="email" placeholder="Email Address" id="coach-email" />
                                            <i className="fa fa-envelope"></i>
                                    </div>
                                    <div className="field col-xs-12">
                                        <input type="password" name="password" placeholder="Password" id="coach-password" />
                                            <i className="fa fa-lock"></i>
                                    </div>
                                    <div className="check col-xs-12">
                                        <label className="control control--checkbox">Remember Me
                                            <input type="checkbox" id="coach-remember" />
                                            <div className="control__indicator"></div>
                                        </label>
                                    </div>
                                    <div className="col-xs-12 button">
                                        <a href="javascript:;"><button className="btn" onClick={this.loginCoach} id="coach-login-btn">Login</button></a>
                                    </div>
                                    <a type="button" id="forgotModalCoachLink" data-toggle="modal" data-target="#forgotModalCoach"><h5>Forgot Password ?</h5></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="forgotModalAdmin" role="dialog">
                    <div className="modal-dialog allot">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" id="forgotModalAdminClose" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Forgot Password</h4>
                            </div>
                            <div className="modal-body clearfix">
                                <div className="field col-xs-12">
                                    <input type="text" name="fe_admin" id="fe_admin" value={this.state.fe_admin} onChange={(e) => this.handleChange(e)} placeholder="Enter Email Address"/>
                                </div>
                                <button className="btn" name="admin" onClick={(e) => this.sendForgetEmail(e)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="forgotModalCoach" role="dialog">
                    <div className="modal-dialog allot">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" id="forgotModalCoachClose" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Forgot Password</h4>
                            </div>
                            <div className="modal-body clearfix">
                                <div className="field col-xs-12">
                                    <input type="text" name="fe_coach" id="fe_coach" value={this.state.fe_coach} onChange={(e) => this.handleChange(e)} placeholder="Enter Email Address"/>
                                </div>
                                <button className="btn" name="coach" onClick={(e) => this.sendForgetEmail(e)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
