import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage, SuccessPage, CalenderPage} from "./pages";
import {PrivateRoute} from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalenderPage />}></Route>
        {/* <Route path="/" element={<LoginPage />}></Route> */}

        <Route path="/success" element={<PrivateRoute element={<SuccessPage />} />} />
        <Route path="/calender" element={<PrivateRoute element={<CalenderPage />} />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
