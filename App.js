import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import AddScreen from "./components/AddScreen/AddScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "tomato",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTintColor: "black",
          contentStyle: {
            backgroundColor: "#ececec",
            paddingHorizontal: 20,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ title: "Add task" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
