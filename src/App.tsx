import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Page404 from "./pages/404-page";
import CreatePage from "./pages/create-page";
import DetailPage from "./pages/detail-page";
import HomePage from "./pages/home-page";
import RegisterPage from "./pages/register-page";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
