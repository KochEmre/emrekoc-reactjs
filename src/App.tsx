import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="bottom-center"
        theme="light"
        limit={4}
        pauseOnFocusLoss
        autoClose={2000}
      />
    </div>
  );
};

export default App;
