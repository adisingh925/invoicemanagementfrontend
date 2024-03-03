import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import GlobalState from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
      <div className="dark:bg-gray-900">
        <Main />
      </div>
    </GlobalState>
  );
}

export default App;
