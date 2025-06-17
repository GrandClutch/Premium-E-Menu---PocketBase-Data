import "./index.css";
import BusinessPage from "./pages/BusinessPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:slug" element={<BusinessPage />} />
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
};
export default App;
