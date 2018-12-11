import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link} from 'react-router-dom';

import DetailsTable from '../../containers/Details/details';
import TableList from './table'
import  classes from './list.module.css';
import Registration from '../urlRegistration/registration';

class ListUrls extends Component {

    constructor(props){
        super(props)
        this.state = {
            urlsList:[]
        }
    }

    getData = () =>{
        axios.get("http://localhost:8080/")
        .then((response) => {
            this.setState({
                urlsList:response.data.urls
            })
        })
        .catch((error) => {
            console.log("Error while getting the result--- ", error);
        })
    }

    onDelete = (_id) => {
        axios.delete("http://localhost:8080/"+ _id)
        .then((resp) => {
            this.getData()
        })
    }

    componentDidMount() {   
        this.getData();
    }

    render(){
        let list = this.state.urlsList.map((data) =>{
            return (
                <tr key={data._id}>
                    <td>{data.url}</td>
                    <td>{data.method}</td>
                    <td>{JSON.stringify(data.data)}</td>
                    <td>{JSON.stringify(data.headers)}</td>
                    <td>
                        <span className = {classes.linkToDetails}>
                        <Link to={{pathname: '/'+data._id}}  
                        style={{ textDecoration: 'none', color:"white"}} exact>
                            See Details
                        </Link>
                        </span>
                    </td>
                    <td>
                        <span className = {classes.linkToDetails}>
                            <Link to={{
                                pathname: '/edit/urlinfo',
                                state:
                                { 
                                    url:data.url,
                                    method: data.method,
                                    data: JSON.stringify(data.data),
                                    headers:JSON.stringify(data.headers),
                                    heading: "Update the Url Details",
                                    _id: data._id   
                                }
                            }}
                            style={{ textDecoration: 'none', color:"white"}} exact>
                                Edit Url Details
                            </Link>
                        </span>
                    </td>
                    <td>
                        <button onClick= {() => this.onDelete(data._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
        return(
            <div className={classes.urlsTable}>
                <Route path="/" exact render={
                    (routeProps)=> (
                        <TableList {...routeProps} list={list}></TableList>
                    )
                }/>
                <Route path="/:id" exact component={DetailsTable} />
                <Route path="/edit/urlinfo"  component={Registration} />
                
                {/* <Route path="/edit/:url/" exact render={
                    (routeProps) => (
                      <Registration {...routeProps} 
                      url= {this.url} 
                      method= {this.method} 
                      data= {JSON.stringify(this.data)}
                      headers= {JSON.stringify(this.headers)}/> 
                    )}/>
                 */}
                
            </div>
        )
    }
}

export default ListUrls;
