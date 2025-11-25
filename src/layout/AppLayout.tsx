import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { getActiveUserDataApi } from "../modules/Auth/services";
import { getCurrentUser } from "../reduxStore/slices/authSlice";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const { getActiveUser } = getActiveUserDataApi();
  const userData = useSelector(getCurrentUser);
  const hasCalledApi = useRef(false);

  useEffect(() => {
    if (userData && !hasCalledApi.current) {
      hasCalledApi.current = true;
      getActiveUser();
    }
  }, []);

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
