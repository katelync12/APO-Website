import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, ErrorPage, SuccessPage, CalenderPage, EventDetailsPage, Profile, Requirements, CreateAccount, EditRoles, CreateEvent, PermissionError, CreateUserProfile} from "./pages";
import {PrivateRoute, PermissionRoute, UserInitializedRoute} from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>

        <Route path="/event/create" element={<CreateEvent />}></Route>
        <Route path="/event/:id" element={<EventDetailsPage />}></Route>
        <Route path="/profile" element={<UserInitializedRoute element={<Profile />} />} />
        <Route path="/requirements" element={<Requirements />}></Route>
        <Route path="/account/create" element={<CreateAccount />}></Route>
        <Route path="/account/roles" element={<EditRoles />}></Route>
        <Route path="/protected" element={<PermissionRoute permission="auth.default" element={<CalenderPage />} />} />

        <Route path="/success" element={<PrivateRoute element={<SuccessPage />} />} />
        <Route path="/calendar" element={<UserInitializedRoute element={<CalenderPage />} />} />
        <Route path="/createuserprofile" element={<PrivateRoute element={<CreateUserProfile />} />} />
        <Route path="/permissionerror" element={<PermissionError />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
