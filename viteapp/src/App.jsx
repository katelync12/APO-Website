import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage, SuccessPage, CalenderPage, EventDetailsPage, Profile, Requirements, CreateAccount, EditRoles, CreateEvent, PermissionError} from "./pages";
import {PrivateRoute, PermissionRoute} from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>

        <Route path="/event/create" element={<CreateEvent />}></Route>
        <Route path="/event/:id" element={<EventDetailsPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/requirements" element={<Requirements />}></Route>
        <Route path="/account/create" element={<CreateAccount />}></Route>
        <Route path="/account/roles" element={<EditRoles />}></Route>
        <Route path="/protected" element={<PermissionRoute permission="auth.default" element={<CalenderPage />} />} />

        <Route path="/success" element={<PrivateRoute element={<SuccessPage />} />} />
        <Route path="/calendar" element={<PrivateRoute element={<CalenderPage />} />} />
        <Route path="/permissionerror" element={<PermissionError />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
