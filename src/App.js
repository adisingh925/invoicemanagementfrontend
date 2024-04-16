import "./App.css";
import Main from "./components/Main";
import GlobalState from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
        <Main />
    </GlobalState>
  );
}

export default App;
