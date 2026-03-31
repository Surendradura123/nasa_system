import Apod from "./components/Apod";
import Mars from "./components/Mars";
import Neo from "./components/Neo";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>🚀 NASA Explorer</h1>
      <Apod />
      
      <Neo />
    </div>
  );
}

export default App;