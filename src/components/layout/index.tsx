import useAuth from "../../hooks/useAuth.hook";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  console.log(pathname);

  const sideBarRenderer = () => {
    if (isAuthenticated && pathname.toLowerCase().startsWith("/dashboard")) {
      return <Sidebar />;
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Using Outlet, We render all routes that are inside of this Layout */}
      <div className="flex flex-1 min-h-[calc(100vh-48px)]">
        {sideBarRenderer()}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
