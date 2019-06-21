import React from "react";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Possible Unhandled", "Unrecognized WebSocket"]);
import Routes from "./routes";

export default function App() {
  return <Routes />;
}
