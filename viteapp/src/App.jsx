import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage, SuccessPage} from "./pages";
import {PrivateRoute} from './components'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>

        <Route path="/success" element={<PrivateRoute element={<SuccessPage />} />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
