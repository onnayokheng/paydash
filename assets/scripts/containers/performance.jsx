'use strict';

import React from 'react';
import Subnav from '../components/subnav.jsx';

const D3= require('d3'); 

const Overview = React.createClass({

    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({
                    config: json.config,
                    performance: json.performance,
                    isFetching : false,
                });
            })
            .on('error', function(error) { 
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },
    getInitialState: function() {
        return {
            performance: {},
            config: {},
            isFetching : true,
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        
        return (
            <div className="performance-wrapper">
              <Subnav role={this.state.config.role} performance={this.state.performance}/>
            </div>     
        );
    }
});

export default Overview;
