import React, { Component } from 'react';
import Config from '../config';
import { Link , BrowserRouter , Route } from "react-router-dom";

import Home from './coach/Home';
import ManualEntry from './coach/ManualEntry';
import Scan from './coach/Scan';
import Result from './coach/Result';
import History from './coach/History';
import ScanPending from './coach/ScanPending';
import Update from './coach/UpdateInfo';


class Coach extends Component {
    componentWillMount(){
        Config.authenticate("0");
    }
    render() {
        return (
            <div className="clearfix">
                <div className="nav-top col-md-12 col-sm-12 col-xs-12 pd">
                    <div className="col-md-12 col-sm-12 pull-left">
                        <h4 id="top-link"><Link to="/coach/home"><i class="fa fa-long-arrow-left"></i></Link><j id="top-link-head">Brand Name</j></h4>
                    </div>
                    <div className="col-md-12 col-sm-12 pull-right">
                        <ul>
                            <li><a href="javascript:;" onClick={Config.logout}><i className="fa fa-power-off"></i></a></li>
                            <li><Link to="/coach/home"><i className="fa fa-home"></i></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="content col-xs-12 pd">
                    <Route path="/coach/home" component={Home}/>
                    <Route path="/coach/scan" component={Scan}/>
                    <Route path="/coach/manual-entry" component={ManualEntry}/>
                    <Route path="/coach/history" component={History}/>
                    <Route path="/coach/scan-pending/:id" component={ScanPending}/>
                    <Route path="/coach/update" component={Update}/>
                    <Route path="/coach/result" component={Result}/>
                </div>
            </div>
        );
    }
}

export default Coach;
