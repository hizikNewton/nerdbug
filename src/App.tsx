import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:city" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
