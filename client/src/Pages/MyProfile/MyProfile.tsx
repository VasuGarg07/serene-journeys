import { Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { AVATARS, miscErr } from '../../Utils/constants';
import { StorageHelper } from '../../Utils/storage.helper';
import './MyProfile.styles.scss';
import InfiniteSpinner from '../../Components/Spinner/InfiniteSpinner';
import { updateProfile } from '../../Utils/api.service';
import { showNotification } from '../../Utils/utilities';
import { SEVERITY } from '../../Utils/enums';
import { UserData } from '../../Utils/interfaces';

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState(StorageHelper.userProfile?.avatar);
  const [username, setUsername] = useState(StorageHelper.userProfile?.username);

  // Function to handle changes in the TextField
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    const _id = StorageHelper.userProfile?._id;
    if (_id && (userAvatar || username)) {
      setIsLoading(true);

      try {
        const newUserData: UserData = { _id, username: username || '', avatar: userAvatar || '' }
        const { data } = await updateProfile(newUserData);
        showNotification(SEVERITY.Success, data.message);
        StorageHelper.userProfile = newUserData;
      } catch (error: any) {
        if (error.response.status === 400) {
          showNotification(SEVERITY.Error, error.response.data.error);
        } else {
          showNotification(SEVERITY.Error, miscErr);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }


  return (
    <div className='profile-container full-width full-vp-height padding flex-centered-column'>
      <Typography variant="button" textAlign="center" className='heading'>Update Your Profile</Typography>

      <div className='profile-section padding flex-centered-column'>
        <Typography variant="subtitle1">Profile Avatar</Typography>

        <div className='avatars flex-centered-container full-wdith'>

          {AVATARS.map((imgSrc: string, index: number) => (
            <img key={index} src={imgSrc}
              className={`avatar ${imgSrc === userAvatar && 'selected'}`}
              onClick={() => setUserAvatar(imgSrc)} />
          ))}

        </div>

        <Typography variant="subtitle1">User Name</Typography>
        <TextField fullWidth required size="small" variant="outlined"
          disabled={isLoading} value={username} onChange={handleNameChange}
        />

        <div className="submit-btn">
          {!isLoading ?
            <Button onClick={handleSubmit} variant="contained" color="success"
              disableElevation disabled={!username}>
              Update Profile
            </Button> :
            <InfiniteSpinner color="success" />
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile