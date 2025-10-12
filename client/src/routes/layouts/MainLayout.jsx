import LeftBar from "../../components/leftbar/LeftBar";
import TopBar from "../../components/topBar/TopBar";
import './mainLayout.css'
import {Outlet}  from 'react-router'

const MainLayout = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet/>
      </div>
    </div>
  );
}

export default MainLayout;
