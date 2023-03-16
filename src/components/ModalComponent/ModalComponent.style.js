import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        height:400,
        backgroundColor:'white',
        width: '100%',
        padding:10,
        borderRadius:16
    },
    post_container:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    send_button:{
        backgroundColor:'tomato',
        padding:5,
        paddingHorizontal:10,
        borderRadius:8,
        elevation:8
    },
    send_button_text:{
        color:'white'
    },
    line_container:{
        height:0.8,
        backgroundColor:'#000080',
        marginTop:5
    },
    image_picker_container:{
        position:'absolute',
        bottom:10,
        width:'100%',
        height:40,
        alignSelf:'center',
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    post_image:{
        width:'80%',
        height:180,
        justifyContent:'center',
        elevation:10,
        borderRadius:8,
        borderWidth:3,
        borderColor:'red',
        marginTop:20,
        alignSelf:'center'
        
    }
})