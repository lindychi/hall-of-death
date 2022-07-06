import React from "react";
import logo from "./logo.svg";
import "./App.css";

import CharacterList from "./component/CharacterList";

function App() {
  return (
    <div>
      <div style={{ padding: 10 }}>
        <h1>죽음의 전당</h1>
      </div>
      <hr />
      <CharacterList />
    </div>
  );
}

export default App;
