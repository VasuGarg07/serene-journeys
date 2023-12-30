import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FailedLottie from '../../Assets/Lotties/failed.json';
import SuccessLottie from '../../Assets/Lotties/success.json';
import VerifyingLottie from '../../Assets/Lotties/verifying-email.json';
import LogoIcon from '../../Assets/icon.png';
import { LoginCard } from '../../Components/LoginCard/LoginCard';
import LottieAnimation from '../../Components/Lottie/Lottie';
import { resendToken, verifyTokenStatus } from '../../Utils/api.service';
import { miscErr } from '../../Utils/constants';
import { SEVERITY } from '../../Utils/enums';
import { LoginResponse } from '../../Utils/interfaces';
import { StorageHelper } from '../../Utils/storage.helper';
import { isEmpty, showNotification } from '../../Utils/utilities';
import './Auth.style.scss';


const VerifyToken = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [urlToken, setUrlToken] = useState('');
  const [message, setMessage] = useState("Verifying Your Email");

  const getTokenFromUrl = () => {
    // Obtain Token
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get('token');

    // Remove Token from URL
    const newUrl = new URL(window.location.href);
    newUrl.search = '';
    window.history.replaceState({}, '', newUrl.href);

    // Return Token
    return urlToken
  }

  const verifyToken = async (token: string) => {
    setLoading(true);

    try {
      const { data }: { data: LoginResponse } = await verifyTokenStatus(token);

      // Save Token
      StorageHelper.accessToken = data.token;

      // Save UserData
      StorageHelper.userProfile = {
        _id: data._id,
        username: data.username,
        avatar: data.avatar
      }

      setMessage("Your Email has been Verified.");

    } catch (err: any) {
      let errorText: string = "";

      if (err.response.status === 400) {
        errorText = err.response.data.message;
      } else {
        errorText = miscErr;
      }

      if (err.response.data.errorCode == 1) {
        setMessage("Your Email is Already Verified.");
        showNotification(SEVERITY.Info, errorText);
      } else {
        setError(true);
        setMessage("Email Verification Failed.")
        showNotification(SEVERITY.Error, errorText);
      }
    } finally {
      setLoading(false);
    }
  }

  function lottieAnimation() {
    return loading
      ? VerifyingLottie
      : error
        ? FailedLottie
        : SuccessLottie;
  }

  async function resendVerificationToken() {
    setLoading(true);

    try {
      const { data } = await resendToken(urlToken);
      console.log(data)
      showNotification(SEVERITY.Success, data.message);

    } catch (err: any) {
      let errorText: string = "";

      if (err.response.status === 400) {
        errorText = err.response.data.message;
      } else {
        errorText = miscErr;
      }
      showNotification(SEVERITY.Error, errorText);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = getTokenFromUrl();
    setUrlToken(token!);

    if (isEmpty(token)) {
      navigate('/login');
    } else {
      verifyToken(token!);
    }
  }, [])

  return (
    <div className="login-container flex-centered-container">
      <LoginCard className="flex-centered-column padding text-center login-card full-width">

        <div className="flex-centered-container brand margin-vr">
          <img src={LogoIcon} alt="Logo" className="logo" />
          <div className="name">Serene Journeys</div>
        </div>

        <div style={{ width: '200px' }}>
          <LottieAnimation lottie={lottieAnimation()} />
        </div>

        <Typography variant="body1" component="div" fontSize={16} gutterBottom>{message}</Typography>

        {!loading && (error ?
          <Button onClick={() => resendVerificationToken()} className="form-submit-btn full-width" variant="contained" disableElevation color="warning">
            Resend Verification Link
          </Button> :
          <Button onClick={() => navigate("/home")} className="form-submit-btn full-width" variant="contained" disableElevation color="secondary">
            Go to Homepage
          </Button>)
        }
      </LoginCard>
    </div>
  )
}

export default VerifyToken