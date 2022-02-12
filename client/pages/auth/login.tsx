import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from '@/helpers/axios';
import { withUnAuth } from '@/helpers/withUnAuth';
import { AuthWrapperUi } from '@resources/auth/auth.styled';
import { InputUi } from '@/components/inputs/input.styled';
import { FlatButtonBlueUi } from '@/components/buttons/flat-button.styled';

const Login = () => {
  const router = useRouter();

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleFieldsChange = (event: any) => {
    if (error) setError(false);

    setAuthData({
      ...authData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    axios
      .post('/auth/login', authData)
      .then(() => router.push('/'))
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <AuthWrapperUi>
        <form className="auth-box" onSubmit={onSubmit}>
          <h3 className="title">Đăng nhập</h3>
          <div className="description">
            Bạn chưa có tài khoản?{' '}
            <Link href="/auth/register">
              <a>
                <strong>Đăng ký</strong>
              </a>
            </Link>
          </div>
          <InputUi
            type="text"
            value={authData.email}
            onChange={handleFieldsChange}
            name="email"
            placeholder="Email"
          />
          <InputUi
            type="password"
            value={authData.password}
            onChange={handleFieldsChange}
            name="password"
            placeholder="Password"
          />

          <p className="error-message">
            {error && <span>Đăng nhập thất bại</span>}
          </p>

          <FlatButtonBlueUi type="submit">Đăng nhập</FlatButtonBlueUi>
        </form>
      </AuthWrapperUi>
    </>
  );
};

export const getServerSideProps = withUnAuth();

export default Login;
