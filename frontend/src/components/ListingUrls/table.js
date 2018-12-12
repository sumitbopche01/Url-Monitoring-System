import React , {Component} from 'react';

import classes from './list.module.css';
import Registration from '../urlRegistration/registration';

class TableList extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false
        }

        this.toggleDiv = this.toggleDiv.bind(this)
    }

    toggleDiv = () => {
        const { show } = this.state;
        this.setState({
            show: !show
        })
    }
    render(){
        return(
            <div>
                <div className = {classes.registrationHeading}>
                    <button className = {classes.clickHereButton} onClick= {this.toggleDiv}> 
                        Add Url
                    </button>
                </div>
                <div>{this.state.show && <Registration /> }</div>
                <div className ={classes.table}> 
                        <h3 >Urls Being Monitored</h3>      
                        <table>
                            <tbody>
                                <tr>
                                    <th>Url</th>
                                    <th>Method</th>
                                    <th>Data</th>
                                    <th>Headers</th>
                                    <th>See details of Url</th>
                                    <th>Edit Url Details</th>
                                    <th>Stop monitoring Url</th>
                                </tr>
                                    {this.props.list}     
                            </tbody>
                        </table>
                </div>
            </div>
            );
    }
}

export default TableList;
