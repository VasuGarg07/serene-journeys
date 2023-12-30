import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Exit from '../../Assets/exit.jpg';
import { StorageHelper } from '../../Utils/storage.helper';
import { useDialog } from '../DialogProvider/DialogProvider';
import './ConfirmLogout.styles.scss';

const ConfirmLogout = () => {
  const navigate = useNavigate();
  const { closeDialog } = useDialog();

  const logout = () => {
    StorageHelper.clearStorage();
    navigate('/login');
    closeDialog()
  }

  return (
    <div className='flex-centered-column popup-container padding'>
      <span className='text-center'>Are you sure you want to logout?</span>
      <img src={Exit} alt="Logout" className='full-width' />
      <div className='flex-centered-container'>
        <Button onClick={closeDialog} variant="contained" color="error" disableElevation size='small'>Cancel</Button>
        <Button onClick={logout} variant="contained" color="primary" disableElevation size='small'>Confirm</Button>
      </div>
    </div>
  )
}

export default ConfirmLogout