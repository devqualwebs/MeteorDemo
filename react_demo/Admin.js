import React, { Component } from 'react';
import Config from '../config';
import Cookies from 'universal-cookie';
import { Link , BrowserRouter , Route } from "react-router-dom";

import AddPackage from '../containers/admin/AddPackage';
import AddCustomer from '../containers/admin/AddCustomer';
import AddCoach from '../containers/admin/AddCoach';
import CurrentPackage from '../containers/admin/CurrentPackage';
import ExpiredPackage from '../containers/admin/ExpiredPackage';
import TransferPackage from '../containers/admin/TransferPackage';
import PackageReport from '../containers/admin/PackageReport';
import UpdatePackage from '../containers/admin/UpdatePackage';
import Customers from '../containers/admin/Customers';
import CustomerReport from '../containers/admin/CustomerReport';
import UpdateCustomer from '../containers/admin/UpdateCustomer';
import Coaches from '../containers/admin/Coaches';
import CoachReport from '../containers/admin/CoachReport';
import UpdateCoach from '../containers/admin/UpdateCoach';
import Mailer from '../containers/admin/Mailer';
import Settings from '../containers/admin/Settings';

const cookies = new Cookies();

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword:'',
            searchType:cookies.get('searchType') !== undefined ? cookies.get('searchType') : 'Package'
        };

        console.log(cookies.get('searchType'));

        this.search = this.search.bind(this);
    }
    search()
    {
        var curloc = this.props.location.pathname;
        var type = document.getElementById('search-type').value;
        var keyword = document.getElementById('search-keyword').value;
        this.setState({keyword:''});
        if(curloc == '/admin/packages' && type == 'Package') {
            cookies.set('searchType',type);
            cookies.set('keyword',keyword);
            window.location.reload();
        }
        else if(curloc == '/admin/customers' && type == 'Customer') {
            cookies.set('searchType',type);
            cookies.set('keyword',keyword);
            window.location.reload();
        }
        else if(curloc == '/admin/coaches' && type == 'Coach') {
            cookies.set('searchType',type);
            cookies.set('keyword',keyword);
            window.location.reload();
        }
        else {
            switch (type)
            {
                case 'Package':cookies.set('searchType',type);cookies.set('keyword',keyword);this.props.history.push('/admin/packages');
                break;
                case 'Customer':cookies.set('searchType',type);cookies.set('keyword',keyword);this.props.history.push('/admin/customers');
                break;
                case 'Coach':cookies.set('searchType',type);cookies.set('keyword',keyword);this.props.history.push('/admin/coaches');
                break;
            }
        }
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    changeType(e){
        this.setState({searchType: e});
    }
    componentWillMount(){
        Config.authenticate("1");
    }
    render() {
        return (
            <div>
                <div className="nav-top col-md-12 col-sm-12 col-xs-12 pd">
                    <div className="col-sm-6 col-xs-12 search">
                        <input type="text" name="keyword" value={this.state.keyword} onChange={(e) => this.handleChange(e)} placeholder="Search By Name" id="search-keyword"/>
                        <div className="dropdown role">
                            <button className="btn-drop">{this.state.searchType}<i className="fa fa-angle-down"></i></button>
                            <div className="dropdown-content">
                                <input type="hidden" name="searchType" value={this.state.searchType} id="search-type"/>
                                <ul>
                                    <li value="Package" onClick={() => this.changeType('Package')}>Package</li>
                                    <li value="Customer" onClick={() => this.changeType('Customer')}>Customer</li>
                                    <li value="Coach" onClick={() => this.changeType('Coach')}>Coach</li>
                                </ul>
                            </div>
                        </div>
                        <button className="btn" onClick={this.search}>Go</button>
                    </div>
                    <div className="col-sm-6 col-xs-12 pull-right">
                        <ul>
                            <li onClick={Config.logout}>LOGOUT</li>
                        </ul>
                    </div>
                </div>
                <div className="menu col-md-2 col-sm-2 pd">
                    <div className="logo col-xs-12">
                        <img className="img-responsive" src="/images/logo.png"/>
                    </div>
                    <div className="panel-group col-xs-12" id="accordion">
                        <div className="panel panel-default col-xs-12">
                            <div className="panel-heading col-xs-12">
                                <h5 className="panel-title  col-xs-12">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><i className="fa fa-plus" aria-hidden="true"></i>Add New</a>
                                </h5>
                            </div>
                            <div id="collapseOne" className="panel-collapse panel-sub collapse in  col-xs-12">
                                <li className="side-active list-group-item first"><Link to="/admin/add-package">Add New Package</Link></li>
                                <li className="side-active list-group-item"><Link to="/admin/add-customer">Add New Customer</Link></li>
                                <li className="side-active list-group-item last"><Link to="/admin/add-coach">Add New Coach</Link></li>
                            </div>
                        </div>
                        <div className="panel panel-default col-xs-12">
                            <div className="panel-heading two col-xs-12">
                                <h5 className="panel-title col-xs-12">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour"><i className="fa fa-archive" aria-hidden="true"></i>Packages</a>
                                </h5>
                            </div>
                            <div id="collapseFour" className="panel-collapse panel-sub collapse col-xs-12">
                                <li className="side-active list-group-item first"><Link to="/admin/packages">Current Packages</Link></li>
                                <li className="side-active list-group-item"><Link to="/admin/package-expired">Expiring Packages</Link></li>
                                <li className="side-active list-group-item last"><Link to="/admin/transfer-package">Transfer Packages</Link></li>
                            </div>
                        </div>
                        <div className="panel panel-default col-xs-12">
                            <div className="panel-heading two col-xs-12">
                                <h5 className="side-active panel-title">
                                    <Link to="/admin/customers"><i className="fa fa-user" aria-hidden="true"></i>Customer</Link>
                                </h5>
                            </div>
                        </div>
                        <div className="panel panel-default col-xs-12">
                            <div className="panel-heading two col-xs-12">
                                <h5 className="side-active panel-title">
                                    <Link to="/admin/coaches"><i className="fa fa-user-md" aria-hidden="true"></i>Coaches</Link>
                                </h5>
                            </div>
                        </div>
                        <div className="panel panel-default col-xs-12">
                            <div className="panel-heading two col-xs-12">
                                <h5 className="side-active panel-title">
                                    <Link to="/admin/mailer"><i className="fa fa-envelope-o" aria-hidden="true"></i>Mass Mailer</Link>
                                </h5>
                            </div>
                        </div>
                        <div className="panel panel-default col-xs-12">
                            <div className="panel-heading two col-xs-12">
                                <h5 className="side-active panel-title">
                                    <Link to="/admin/setting"><i className="fa fa-cog" aria-hidden="true"></i>Settings</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content col-md-10 col-sm-12 col-xs-12 pd">
                    <Route path="/admin/add-package" component={AddPackage}/>
                    <Route path="/admin/add-customer" component={AddCustomer}/>
                    <Route path="/admin/add-coach" component={AddCoach}/>
                    <Route path="/admin/packages" component={CurrentPackage}/>
                    <Route path="/admin/package-expired" component={ExpiredPackage}/>
                    <Route path="/admin/package/:id" component={PackageReport}/>
                    <Route path="/admin/package-update/:id" component={UpdatePackage}/>
                    <Route path="/admin/transfer-package" component={TransferPackage}/>
                    <Route path="/admin/customers" component={Customers}/>
                    <Route path="/admin/customer/:id" component={CustomerReport}/>
                    <Route path="/admin/customer-update/:id" component={UpdateCustomer}/>
                    <Route path="/admin/coaches" component={Coaches}/>
                    <Route path="/admin/coach/:id" component={CoachReport}/>
                    <Route path="/admin/coach-update/:id" component={UpdateCoach}/>
                    <Route path="/admin/mailer" component={Mailer}/>
                    <Route path="/admin/setting" component={Settings}/>
                </div>
            </div>
        );
    }
}

export default Admin;
