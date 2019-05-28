import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Spinner (props) {
    const { spinnerStyle } = styles

    return (
        <View style={spinnerStyle}>
            <ActivityIndicator size={props.size || 'large'}/>
        </View>
    )
}

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Spinner;