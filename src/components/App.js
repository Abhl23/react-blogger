import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Signup, CreateBlog, BlogDetail } from "../pages";
import Navbar from "./Navbar";

const Page404 = () => {
  return <h1>404 : Page not found!</h1>;
};

// a private route made for authenticated pages
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // if the user is not signed-in redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route
          path="/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
