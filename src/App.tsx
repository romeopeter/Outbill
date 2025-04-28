import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import Popup from "./popup";
import { OverviewPanel } from "./panels/panels-entry";

/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Popup />} />
        <Route path="/overview" element={<OverviewPanel />} />
      </Routes>
    </MemoryRouter>
  );
}