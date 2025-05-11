import { MemoryRouter, Routes, Route } from "react-router-dom";
import {
  OverviewPanel,
  InvoicesPanel,
  TemplatesPanel,
  CustomersPanel,
  ProfilePanel,
} from "./panels-entry";
import "./app.css";

/* --------------------------------------------------------------------------------------- */

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<OverviewPanel />} />
        <Route path="/invoices" element={<InvoicesPanel />} />
        <Route path="/templates" element={<TemplatesPanel />} />
        <Route path="/customers" element={<CustomersPanel />} />
        <Route path="/profile" element={<ProfilePanel />} />
      </Routes>
    </MemoryRouter>
  );
}
