import { Outlet } from 'react-router-dom';
import Sidenav from '../../Components/Sidenav/Sidenav';
import { DialogProvider } from '../../Components/DialogProvider/DialogProvider';

const Dashboard = () => {
  return (
    <DialogProvider>
      <div className='full-width display-flex'>
        <Sidenav />
        <Outlet></Outlet>
      </div>
    </DialogProvider>
  )
}

export default Dashboard;

