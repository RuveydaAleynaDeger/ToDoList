import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import Colors from "./constants/Colors";
import firebase from "firebase/app";
import "firebase/firestore";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        </AuthStack.Navigator>
    );
};
const Screens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="To Do List" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen
                name="ToDoList"
                component={ToDoList}
                options={({ route }) => {
                    return {
                        title: route.params.title,
                        headerStyle: {
                            backgroundColor: route.params.color,
                        },
                        headerTintColor: "white",
                    };
                }}
            />
            <Stack.Screen
                name="Edit"
                component={EditList}
                options={({ route }) => {
                    return {
                        title: route.params.title
                            ? `Edit ${route.params.title} list`
                            : "Create new list",
                        headerStyle: {
                            backgroundColor: route.params.color || Colors.blue,
                        },
                        headerTintColor: "white",
                    };
                }}
            />
        </Stack.Navigator>
    );
};
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (firebase.auth().currentUser) {
            setIsAuthenticated(true);
        }
        firebase.auth().onAuthStateChanged((user) => {
            console.log("Checking auth state...");
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <Screens /> : <AuthScreens />}
        </NavigationContainer>
    );
}
// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAx7tEC8K5pTD-ZBx1cf2hq_sZH-L2n3ZM",
    authDomain: "deneme-4d48e.firebaseapp.com",
    databaseURL: "https://deneme-4d48e-default-rtdb.firebaseio.com",
    projectId: "deneme-4d48e",
    storageBucket: "deneme-4d48e.appspot.com",
    messagingSenderId: "189521770297",
    appId: "1:189521770297:web:49ef2da791821d41d8dae8",
    measurementId: "G-P2C4CMST2S"
  };;

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); 
}
