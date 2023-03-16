import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        margin:5,
        backgroundColor:'white',
        flexDirection:'row',
        padding:5,
        borderRadius:12,
        elevation:8,
        zIndex:1,
        alignItems:'center'
    },
    image:{
        width:60,
        height:60,
        borderRadius:6,
        marginRight:10
    },
    header_text:{
        color:'black',
        fontSize:14,
        width:200
    },
    inner_container:{
        justifyContent:'space-around',
        height:60
    }
})