import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LogoIcon from '../../Assets/icon.png';
import InfiniteSpinner from "../../Components/Spinner/InfiniteSpinner";
import { LoginCard } from "../../Components/LoginCard/LoginCard";
import { signin, signup } from "../../Utils/api.service";
import { miscErr, userLoginSuccess } from "../../Utils/constants";
import { SEVERITY } from "../../Utils/enums";
import { LoginRequest, LoginResponse } from "../../Utils/interfaces";
import { StorageHelper } from "../../Utils/storage.helper";
import { loginSchema, showNotification } from "../../Utils/utilities";
import './Auth.style.scss';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginRequest>({ resolver: yupResolver(loginSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();



  const toggleLoginState = () => {
    setIsLogin(!isLogin);
    reset({ email: "", password: "" });
  };

  const submitForm: SubmitHandler<LoginRequest> = async (userCreds: LoginRequest) => {
    setIsLoading(true);

    const request = isLogin ? signin(userCreds) : signup(userCreds);

    try {
      const { data } = await request;
      showNotification(SEVERITY.Success, isLogin ? userLoginSuccess : data.message);
      setIsLoading(false);

      if (!isLogin) {
        toggleLoginState();
      } else {
        const userdata = data as LoginResponse;
        // Save Token
        StorageHelper.accessToken = userdata.token;
        // Save UserData
        StorageHelper.userProfile = {
          _id: userdata._id,
          username: userdata.username,
          avatar: userdata.avatar
        }
        navigate("/home");
      }

    } catch (error: any) {

      setIsLoading(false);
      if (error.response.status === 400) {
        showNotification(SEVERITY.Error, error.response.data.error);
      } else {
        showNotification(SEVERITY.Error, miscErr);
      }
    }
  }

  return (
    <div className="login-container flex-centered-container">
      <LoginCard className="flex-centered-column padding text-center login-card full-width">

        <div className="flex-centered-container brand margin-vr">
          <img src={LogoIcon} alt="Logo" className="logo" />
          <div className="name">Serene Journeys</div>
        </div>
        <div className="login-form-header">
          {isLogin ? (
            <Header
              heading="Login to your Account"
              paragraph="Don't have an account yet?"
              linkText="Signup"
              handleClick={toggleLoginState} />
          ) : (
            <Header
              heading="Signup to create your Account"
              paragraph="Already have an account?"
              linkText="Login"
              handleClick={toggleLoginState} />
          )}
        </div>
        <div className="login-form full-width">
          <div className="form-field">
            <p>E-mail</p>
            <TextField {...register("email")} autoFocus fullWidth required size="small" variant="outlined" disabled={isLoading} />
            <Typography variant="caption" color={"error.main"} className="error-text">
              {errors.email?.message}
            </Typography>
          </div>

          <div className="form-field">
            <p>Password</p>
            <TextField {...register("password")} fullWidth size="small" type="password" variant="outlined" disabled={isLoading} />
            <Typography variant="caption" color={"error.main"} className="error-text">
              {errors.password?.message}
            </Typography>
          </div>

          {/* {isLogin && (
            <div className="form-extra flex-justified full-width">
              <span>
                <input id="remember-me" name="remember-me" type="checkbox" />
                <label htmlFor="remember-me"> Remember me </label>
              </span>
              <span>Forget Password?</span>
            </div>
          )} */}

          {!isLoading ?
            <Button onClick={handleSubmit(submitForm)} className="form-submit-btn full-width" variant="contained" color="warning" disableElevation>
              {isLogin ? "Log In" : "Create Account"}
            </Button> :
            <InfiniteSpinner sx={{ marginTop: "16px" }} color="warning" />
          }
        </div>
      </LoginCard>
    </div>
  );
};

export default Login;

interface HeaderProps {
  heading: string,
  paragraph: string,
  linkText: string,
  handleClick: () => void
}

const Header = ({ heading, paragraph, linkText, handleClick }: HeaderProps) => {
  return (
    <>
      <h2>{heading}</h2>
      <p>{paragraph} <span onClick={handleClick}>{linkText}</span></p>
    </>
  )
}

