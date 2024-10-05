import { Text, View } from "react-native";

import Login from "./../../Components/Login";
import Gamedetails from "./../(tabs)/(tab)/Games"
// import LoginUser from "./../../Components/LoginUser";




export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     
      <Gamedetails/>
   
    </View>
    
  );
}