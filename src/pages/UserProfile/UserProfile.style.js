import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"azure",
   
  
    },
    image:{
        width:100,
        height:100,
        backgroundColor:'red',
        borderRadius:60,
        position:'absolute',
        top:70,
        left:20,
        borderWidth:2,
        borderColor:'white'
    },
    header_container:{
      width:'100%',
      height:120,
      backgroundColor:'tomato'
    },
    name_text:{
      color:'black',
      fontSize:16,
      fontWeight:'bold',
      marginLeft:20,
      marginTop:60
    },
    line_container:{
      height:2,
      backgroundColor:'#000080',
      marginTop:10
    },
    favourites_text:{
      color:'#000080',
      alignSelf:'center',
      fontSize:16,
      fontWeight:'bold',
      marginTop:20,
      marginBottom:20
    },
    icon_container:{
      backgroundColor:'white',
      position:'absolute',
      top:15,
      zIndex:1,
      left:15,
      borderRadius:50
  }
    
})