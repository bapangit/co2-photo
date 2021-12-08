import React, { Suspense, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute'
/* 
Components
 */
import NavigationBar from './components/Header/NavigationBar';
import LogOutDialog from './components/Elements/Dialogs/LogOutDialog';
/* 
Containers
 */
const Login = React.lazy(() => import("./containers/Login"))
const Photos = React.lazy(() => import("./containers/Photos"))
const MyPhotos = React.lazy(() => import("./containers/MyPhotos"))
const NewPhotos = React.lazy(() => import("./containers/NewPhotos"))
const Reported = React.lazy(() => import("./containers/Reported"))

const Loader = () => <div className="loader"><div>Loading...</div></div>
function App() {
  const { auth, setAuth } = useContext(AuthContext)
  /* locastorage is checked for the refreshtoken */
  localStorage.getItem("refresh_token") ? setAuth(true) : setAuth(false)
  return (
    <Router>
      <LogOutDialog />
      <NavigationBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Photos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newphotos" element={<NewPhotos />} />
          <Route path="/reported" element={<Reported />} />
          <Route path="/myphotos" element={<ProtectedRoute auth={auth} requiredComponent={<MyPhotos />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
