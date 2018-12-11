import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import ListUrls from '../../components/ListingUrls/list';

class UrlMonitorMain extends Component {
    render(){
        return (
            <Aux>
                <ListUrls />
            </Aux>
        )
    }
}

export default UrlMonitorMain;
