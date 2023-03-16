import React from "react";
import { TouchableOpacity,Text} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'


const LikeComponent = ({iconName,text,onPress}) => {
    return(
        <TouchableOpacity style={{flexDirection:'row'}} onPress={onPress} >
        <EvilIcons name={iconName} size={24} color='gray' />
        <Text>{text}</Text>
        </TouchableOpacity>
        
    )
}
export default LikeComponent