import { TouchableOpacity, Text,View } from 'react-native'
import React from 'react'
import styles from "./Btn.style"

const Btn = ({onPress,title}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Btn