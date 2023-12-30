import { EditNote, HomeRounded, Logout, PersonOutline } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../Assets/icon.png';
import ConfirmLogout from '../ConfirmLogout/ConfirmLogout';
import { useDialog } from '../DialogProvider/DialogProvider';
import './Sidenav.styles.scss';

const Sidenav = () => {
  const navigate = useNavigate();
  const { openDialog } = useDialog();

  const handleOpenDialog = () => {
    const content = <ConfirmLogout />;
    openDialog(content);
  };


  return (
    <div className='nav-container flex-centered-column full-vp-height'>
      <div className='nav-item flex-centered-container-vr padding full-width brand'>
        <img src={LogoIcon} alt="Logo" className="item-icon" />
        <div className='item-name'>Serene Journeys</div>
      </div>

      <Divider flexItem sx={{ borderColor: "#ffffff6a" }} />

      <div className='nav-item flex-centered-container-vr padding full-width'
        onClick={() => { navigate('/home') }}>
        <HomeRounded className="item-icon" />
        <div className='item-name'>Home</div>
      </div>

      <div className='nav-item flex-centered-container-vr padding full-width'
        onClick={() => { navigate('/home/new-post') }}>
        <EditNote className="item-icon" />
        <div className='item-name'>Write New Blog</div>
      </div>

      <div className='nav-item flex-centered-container-vr padding full-width'
        onClick={() => { navigate('/home/my-profile') }}>
        <PersonOutline className="item-icon" />
        <div className='item-name'>My Profile</div>
      </div>

      <div className='nav-item flex-centered-container-vr padding full-width'
        onClick={handleOpenDialog}>
        <Logout className="item-icon" />
        <div className='item-name'>Logout</div>
      </div>

    </div>
  )
}

export default Sidenav