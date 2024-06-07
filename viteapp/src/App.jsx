import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage, SuccessPage, CalenderPage, EventDetailsPage, Profile, Requirements, CreateAccount, EditRoles, CreateEvent} from "./pages";
import {PrivateRoute} from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/calendar" element={<CalenderPage />}></Route>

        <Route path="/event/create" element={<CreateEvent />}></Route>
        <Route path="/event/:id" element={<EventDetailsPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/requirements" element={<Requirements />}></Route>
        <Route path="/account/create" element={<CreateAccount />}></Route>
        <Route path="/account/roles" element={<EditRoles />}></Route>


        <Route path="/success" element={<PrivateRoute element={<SuccessPage />} />} />
        <Route path="/calender" element={<PrivateRoute element={<CalenderPage />} />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
