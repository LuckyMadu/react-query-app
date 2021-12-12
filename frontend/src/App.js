import { useState } from "react";
import "./App.css";
import UserDetail from "./UserDetail";
import Users from "./Users";

function App() {
  const [userId, setUserId] = useState();
  return (
    <div className="App">
      <div className="left">
        <Users setUserId={setUserId} />
      </div>
      <div className="right">
        <UserDetail userId={userId} />
      </div>
    </div>
  );
}

export default App;
