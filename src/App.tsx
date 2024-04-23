import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MappedShirts from "./components/MappedShirts";
import Design from "./pages/Design";
//import About from "./pages/About";

// rest of your code

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Routes>
            <Route path="/" element={<MappedShirts />} />
            <Route path="/shirt/:id" element={<Design />} />
          </Routes>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
