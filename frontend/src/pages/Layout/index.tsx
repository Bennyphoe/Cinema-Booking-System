import { FC } from "react";
import { Outlet } from "react-router-dom";
import './styles.css'


const Layout: FC = () => {
  return (
    <div className="layout container-fluid">
      <Outlet />
    </div>
  )
}

export default Layout