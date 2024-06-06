import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage, SuccessPage, CalenderPage, EventDetailsPage} from "./pages";
import {PrivateRoute} from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/calendar" element={<CalenderPage />}></Route>
        <Route path="/event/:id" element={<EventDetailsPage />}></Route>

        <Route path="/success" element={<PrivateRoute element={<SuccessPage />} />} />
        <Route path="/calender" element={<PrivateRoute element={<CalenderPage />} />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
