import { LoginRequiredWrapperUi } from "./login-required-popup.styled"

interface LoginRequiredPopupProps {
  msg?: string
}

const LoginRequiredPopUp: React.FC<LoginRequiredPopupProps> = ({msg}) => {
  return <LoginRequiredWrapperUi>
    {msg || 'Bạn cần đăng nhập'}
  </LoginRequiredWrapperUi>
}

export default LoginRequiredPopUp;
