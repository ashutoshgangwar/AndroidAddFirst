import { Text, View } from "react-native";

import Login from "./../../Components/Login";



export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     
      <Login/>
   
    </View>
    
  );
}