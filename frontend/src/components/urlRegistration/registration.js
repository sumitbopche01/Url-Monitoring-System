import React, { Component } from 'react';
import axios from 'axios';

import  classes from './registration.module.css';

class Registration extends Component {
    state = {
        _id:'', 
        url:'',
        method:'',
        data:'',
        headers:'',
        heading:"Register Url To start monitoring",
        btnName:''
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = () => {
        let data = this.state.data === '' ? {} : this.state.data;
        let headers = this.state.headers === '' ? {} : this.state.headers
        let url,method;

        if(this.state._id === ''){
            url = "http://localhost:8080/";
            method = "POST"
        }
        else{
            url = "http://localhost:8080/" + this.state._id;
            method = "PUT"
        }

        let req = {
            url: url,
            method:method,
            data:{
                url:this.state.url,
                method:this.state.method,
                data:data,
                headers:headers
            }
        }

        console.log("requst is as follows ---- ", req);
        axios(req).then((response)=>{
            alert("Started monitoring the service!!",response);
            this.getData();
        },error=>{
            console.log("-------------",error);
        })
    }

    componentDidMount(){
        console.log("this props are as ---- ", this.props.location);
        if(this.props.location !== undefined){
            this.setState({
                heading: this.props.location.state.heading,
                url: this.props.location.state.url,
                method: this.props.location.state.method,
                data: this.props.location.state.data,
                headers: this.props.location.state.headers,
                _id: this.props.location.state._id
            })    
        }
    }

    render(){
        return (
            <div>
                <form>
                    <div className={classes.container}>
                        <h1>{this.state.heading}</h1>
                        <p>Please fill in this form to register the Url</p>
                        <hr></hr>
                        
                        <label><b>Url</b></label>
                        <input 
                            type="text" 
                            placeholder= "Url to monitor eg. www.google.com/"
                            name="url" 
                            value={this.state.url}
                            //onChange={e => this.setState({name: e.target.value})}
                            onChange = { e => this.change(e) }
                            required></input>
                        
                        <label><b>Method</b></label>
                        <input 
                            type="text" 
                            placeholder="Method for the request eg.GET" 
                            name="method"
                            value={this.state.method}
                            onChange={ e => this.change(e) }
                            required></input>

                        <label><b>Data</b></label>
                        <input 
                            type="text" 
                            placeholder="Data to pass with the request eg. {'a': 'b'}"
                            name="data" 
                            value={this.state.data}
                            onChange= {e => this.change(e)}>
                            </input>
                        
                        <label><b>headers</b></label>
                        <input 
                            type="text" 
                            placeholder="Headers for the request eg .{ 'Content-type':'application/json' }" 
                            name="headers" 
                            value={this.state.headers}
                            onChange = { e => this.change(e)}>
                            </input>
                        <hr></hr>

                        <button 
                            type="submit" 
                            className={classes.registerbtn}
                            onClick={ () => this.onSubmit()}>
                                Start Monitoring + {this.state.btnName}
                        </button>
                    </div>
                </form>
            </div>
        );
    }    
}

export default Registration;
