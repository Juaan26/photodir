import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlatListScreen from "./FlatListScreen";
import AddImageScreen from "./AddImageScreen";

const Stack = createStackNavigator();

export default function App() {
  const [data, setData] = useState([
    { id: "1", title: "Titulo 1", subtitle: "Subtitle 1", url: "https://picsum.photos/200/300", year: 2020 },
    { id: "2", title: "Title 2", subtitle: "Subtitle 2", url: "https://picsum.photos/200/300", year: 2021 },
    { id: "3", title: "Title 3", subtitle: "Subtitle 3", url: "https://picsum.photos/200/300", year: 2022 },
    { id: "4", title: "Titulo 4", subtitle: "Subtitle 4", url: "https://picsum.photos/200/300", year: 2021 },
    { id: "5", title: "Title 5", subtitle: "Subtitle 5", url: "https://picsum.photos/200/300", year: 2020 },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FlatListScreen">
          { props => <FlatListScreen { ...props } data={ data } setData={ setData } /> }
        </Stack.Screen>
        <Stack.Screen name="AddImageScreen">
          { props => <AddImageScreen { ...props } data={ data } setData={ setData } /> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
