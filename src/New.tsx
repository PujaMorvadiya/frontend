import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./modules/AuthPages/SignIn";
import SignUp from "./modules/AuthPages/SignUp";
import NotFound from "./modules/OtherPage/NotFound";
import UserProfiles from "./modules/UserProfiles";
import Videos from "./modules/UiElements/Videos";
import Images from "./modules/UiElements/Images";
import Alerts from "./modules/UiElements/Alerts";
import Badges from "./modules/UiElements/Badges";
import Avatars from "./modules/UiElements/Avatars";
import Buttons from "./modules/UiElements/Buttons";
import LineChart from "./modules/Charts/LineChart";
import BarChart from "./modules/Charts/BarChart";
import Calendar from "./modules/Calendar";
import BasicTables from "./modules/Tables/BasicTables";
import FormElements from "./modules/Forms/FormElements";
import Blank from "./modules/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./modules/Dashboard/Home";
import React from "react";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
