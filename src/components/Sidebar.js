import './Sidebar.css'
import { NavLink } from 'react-router-dom';
// import {useAuthContext} from '../hooks/useAuthContext'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import LogoutIcon from '../assets/logout_icon.svg'
import { useLogout } from '../hooks/useLogout'
// import Avatar from './Avatar';


export default function Sidebar() {
//   const { user } = useAuthContext()
const { logout, isPending } = useLogout()
  return (
    <div className="sidebar">
    <div className="sidebar-content"> 
      <nav className="links">
        <ul>
          <li>
            <NavLink to="/">
              <img src={DashboardIcon} alt="dashboard icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/create">
              <img src={AddIcon} alt="add project icon" />
              <span>Create Blog</span>
            </NavLink>
            </li>
            <li>
                <div className='logout'>
              <img src={LogoutIcon} alt="dashboard icon" />
              {!isPending &&  <span onClick={logout}>Logout</span>}
              {isPending &&  <span>Logging out</span>}
               </div>
            </li>
        </ul>
      </nav>
    </div>
  </div>
  )
}
