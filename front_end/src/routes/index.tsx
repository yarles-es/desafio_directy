import { Route, Routes } from "react-router-dom";
import App from "../App";
import CounterPage from "../pages/Counter";
import CounterTablePage from "../pages/TableContador";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/counter-table" element={<CounterTablePage />} />
    </Routes>
  );
};

export default AppRoutes;
