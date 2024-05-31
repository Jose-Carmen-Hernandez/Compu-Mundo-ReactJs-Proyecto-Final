import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmnCIN-WpIw4uKj3lHkdNfdV31PQ9N9Rs",
  authDomain: "compumundo-react.firebaseapp.com",
  projectId: "compumundo-react",
  storageBucket: "compumundo-react.appspot.com",
  messagingSenderId: "933380735217",
  appId: "1:933380735217:web:e5cb2071ed282cd6f1e950",
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Por recomendacion del profesor, quitamos el modo estricto de React:
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
