// Made by Taha Bisgin.
// ©TahaBisginSoftware, all rights reserved.
import * as React from  'react';
import { Appbar } from 'react-native-paper';

const Header = () => {
    return(
        <Appbar.Header style = {{marginTop:0, backgroundColor:'#364156'}}>
            <Appbar.Content title="Home"/>
        </Appbar.Header>
    )
}

export default Header;