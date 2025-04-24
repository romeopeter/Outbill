import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OverviewPanel } from "./panels/panels-entry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OverviewPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
