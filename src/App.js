import React from "react";
import PlatformSelect from "./components/PlatformSelect/PlatformSelect"
import Header from "./components/Header/Header"
import { onPageLoad } from "./scripts/spotify";
import './App.css';

onPageLoad();

function App() {
  return (
    <div className="App">
      <Header />
      <PlatformSelect />
    </div>
  );
}

export default App;
