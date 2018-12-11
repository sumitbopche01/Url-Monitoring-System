import React, { Component } from 'react';
import axios from 'axios';

import classes from './details.css';

class DetailsTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            responses:[],
            percentile50th:'',
            percentile75th:'',
            percentile95th:'',
            percentile99th:''
        }
    }

    getData(id){
        axios.get("http://localhost:8080/"+ id)
            .then((resp) => {
                console.log("------------response ", resp)
                this.setState({
                    responses: resp.data.responses,
                    percentile50th: resp.data["50th_percentile"],
                    percentile75th: resp.data["75th_percentile"],
                    percentile95th: resp.data["95th_percentile"],
                    percentile99th: resp.data["99th_percentile"]
                })
                console.log("resp data ----- ", resp.data["99th_percentile"]);
            })
            .catch((error) => {
                console.log("Error while getting details for id ", error);
            })
    }

    componentDidMount(){
        console.log("this.props ----- ", this.props.match);
        this.getData(this.props.match.params.id);
    }
    render(){
        
        return(
            <table>
                <tbody>
                    <tr>
                        <th>Last 100 Response Time</th>
                        <th>50th_percentile</th>
                        <th>75th_percentile</th>
                        <th>95th_percentile</th>
                        <th>99th_percentile</th>
                    </tr>
                    <td>{this.state.responses.join(" , ")}</td>
                    <td>{this.state.percentile50th}</td>
                    <td>{this.state.percentile75th}</td>
                    <td>{this.state.percentile95th}</td>
                    <td>{this.state.percentile99th}</td>
                </tbody>
            </table>
        )
    }
}

export default DetailsTable;
