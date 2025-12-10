import { JSX, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";

import Org from "components/Icon/assets/Org";
import UserHexa from "components/Icon/assets/UserHexa";

import { useSidebar } from "../context/SidebarContext";

import { useSelector } from "react-redux";
import { activeLayoutType } from "reduxStore/slices/layoutSlice";

import { LayoutConstant, Roles } from "constant/common.constant";
import {
  AdminNavigation,
  PRIVATE_NAVIGATION,
  OrganizationNavigation,
  UserNavigation,
} from "constant/navigation.constant";

/* ----------------------------------------------
   🟢 ADDED: TYPE
---------------------------------------------- */
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

/* ----------------------------------------------
   🔵 UPDATED: ROLE-BASED MENU
   Converted from your old sidebar structure
   into the structure your new component expects.
---------------------------------------------- */
const getRoleBasedMenu = (activeLayout: string): NavItem[] => {
  if (activeLayout === LayoutConstant.Admin) {
    return [
      {
        name: "Dashboard",
        icon: <GridIcon />,
        path: AdminNavigation.dashboard.view.path,
      },
      {
        name: "Manage Users",
        icon: <UserHexa />,
        path: AdminNavigation.manageUsers.list.path,
      },
      {
        name: "Manage Organizations",
        icon: <Org />,
        path: AdminNavigation.manageOrganizations.list.path,
      },
      {
        name: "Manage Movies",
        icon: <PageIcon />,
        path: AdminNavigation.manageMovies.list.path,
      },
      {
        name: "Calendar",
        icon: <CalenderIcon />,
        path: AdminNavigation.calendar.view.path,
      },
      {
        name: "Manage Availability",
        icon: <CalenderIcon />,
        path: AdminNavigation.calendar.view.path,
      },
      {
        name: "Settings",
        icon: <PlugInIcon />,
        path: AdminNavigation.settings.view.path,
      },
      {
        name: "Profile",
        icon: <UserCircleIcon />,
        path: AdminNavigation.profile.view.path,
      },
      {
        name: "Reports",
        icon: <PieChartIcon />,
        subItems: [
          { name: "Bookings", path: AdminNavigation.reports.bookings.path },
          { name: "Users", path: AdminNavigation.reports.users.path },
        ],
      },
    ];
  }

  if (activeLayout === LayoutConstant.Organization) {
    return [
      {
        name: "Dashboard",
        icon: <GridIcon />,
        path: OrganizationNavigation.dashboard.view.path,
      },
      {
        name: "Movies",
        icon: <PageIcon />,
        path: OrganizationNavigation.manageMovies.list.path,
      },
      {
        name: "Shows",
        icon: <CalenderIcon />,
        path: OrganizationNavigation.manageShows.list.path,
      },
      {
        name: "Bookings",
        icon: <BoxCubeIcon />,
        path: OrganizationNavigation.manageBookings.view.path,
      },
      {
        name: "Profile",
        icon: <UserCircleIcon />,
        path: OrganizationNavigation.profile.view.path,
      },
    ];
  }

  if (activeLayout === LayoutConstant.User) {
    return [
      {
        name: "Dashboard",
        icon: <GridIcon />,
        path: "/",
      },
      {
        name: "Bookings",
        icon: <BoxCubeIcon />,
        path: UserNavigation.bookings.view.path,
      },
      {
        name: "Wishlist",
        icon: <PieChartIcon />,
        path: UserNavigation.wishlist.view.path,
      },
      {
        name: "Profile",
        icon: <UserCircleIcon />,
        path: PRIVATE_NAVIGATION.profile.view.path,
      },
    ];
  }

  return [];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const activeLayout = useSelector(activeLayoutType);

  /* ----------------------------------------------
     🟢 ADDED: dynamic menu based on role
  ---------------------------------------------- */
  const menuItems = getRoleBasedMenu(activeLayout);

  const [openSubmenu, setOpenSubmenu] = useState<{
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  /* ----------------------------------------------
     Auto-expand submenu if route matches
  ---------------------------------------------- */
  useEffect(() => {
    let submenuMatched = false;

    menuItems.forEach((nav, index) => {
      nav.subItems?.forEach((sub) => {
        if (isActive(sub.path)) {
          setOpenSubmenu({ index });
          submenuMatched = true;
        }
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [location.pathname, menuItems, isActive]);

  useLayoutEffect(() => {
    if (openSubmenu !== null) {
      const key = `main-${openSubmenu.index}`;
      const element = subMenuRefs.current[key];
      if (element) {
        const height = element.scrollHeight;
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: height,
        }));
      }
    }
  }, [openSubmenu, isExpanded, isHovered, isMobileOpen]);

  const toggleSubMenu = (index: number) => {
    setOpenSubmenu((p) => (p?.index === index ? null : { index }));
  };

  /* ----------------------------------------------
     Render Menu Items (UNCHANGED)
  ---------------------------------------------- */
  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => toggleSubMenu(index)}
              className={`menu-item group ${openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                }`}
            >
              <span
                className={`menu-item-icon-size ${openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="menu-item-text">{nav.name}</span>
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform ${openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                      }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {/* Submenu */}
          {nav.subItems && (
            <div
              ref={(el) => {
                subMenuRefs.current[`main-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.index === index && (isExpanded || isHovered || isMobileOpen)
                    ? `${subMenuHeight[`main-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      to={sub.path}
                      className={`menu-dropdown-item ${isActive(sub.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 border-r h-screen transition-all duration-300 z-50
      ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <img src="/images/logo/sideLogo.svg" width={180} />
          ) : (
            <img src="/images/logo/logo2.svg" width={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          <h2
            className={`mb-4 text-xs uppercase flex text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
              }`}
          >
            {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
          </h2>

          {/* RENDER DYNAMIC ROLE-WISE MENU */}
          {renderMenuItems(menuItems)}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
