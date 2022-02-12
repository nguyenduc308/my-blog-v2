import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import axios from '@/helpers/axios';
import { withUnAuth } from '@/helpers/withUnAuth';
import { AuthWrapperUi } from '@resources/auth/auth.styled';
import { InputUi } from '@/components/inputs/input.styled';
import { FlatButtonBlueUi } from '@/components/buttons/flat-button.styled';
import { Col, Row } from '@/components/grid';

const INITIAL_VALUE = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  confirm_password: '',
};

const Register = () => {
  const router = useRouter();

  const [authData, setAuthData] = useState({ ...INITIAL_VALUE });
  const [error, setError] = useState({ ...INITIAL_VALUE });
  const [isFailed, setIsFailed] = useState(false);

  const handleFieldsChange = (event: any) => {
    setAuthData({
      ...authData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFocus = () => {
    setError({ ...INITIAL_VALUE });
    setIsFailed(false);

    let required: any = {};


    if (Object.keys(required).length) {
      setError({ ...error, ...required });
    }

    if (authData.password !== authData.confirm_password) {
      setError({ ...error, confirm_password: 'Nhập lại mật khẩu không khớp' });
    }

    
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    let errors: any = {};
    Object.entries(authData).forEach(([key, value]) => {
      if (value.trim() === '') {
        errors = { ...errors, [key]: 'Trường này bắt buộc' };
      }
    });
    if (authData.password.length < 6) {
      errors = { ...errors, password: 'Mật khẩu quá ngắn (tối thiểu 6 kí tự)' }
    }
    if (authData.password !== authData.confirm_password) {
      errors = { ...errors, confirm_password: 'Nhập lại mật khẩu không khớp' };
    }

    setError(errors);

    if (Object.values(errors).filter((v) => !!v).length === 0) {
      axios
        .post('/auth/register', authData)
        .then(() => router.push('/'))
        .catch(() => {
          setIsFailed(true);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <AuthWrapperUi>
        <form className="auth-box" onSubmit={onSubmit}>
          <h3 className="title">Đăng ký</h3>

          <div className="description">
            Bạn đã có tài khoản?{' '}
            <Link href="/auth/login">
              <a>
                <strong>Đăng nhập</strong>
              </a>
            </Link>
          </div>

          <Row>
            <Col sm="6">
              <InputUi
                type="text"
                value={authData.first_name}
                onChange={handleFieldsChange}
                name="first_name"
                placeholder="Họ"
                onFocus={handleFocus}
              />
              <p className="color-red text-small">{error.first_name}</p>
            </Col>
            <Col sm="6">
              <InputUi
                type="text"
                value={authData.last_name}
                onChange={handleFieldsChange}
                name="last_name"
                placeholder="Tên"
                onFocus={handleFocus}
              />
              <p className="color-red text-small">{error.last_name}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <InputUi
                type="text"
                value={authData.email}
                onChange={handleFieldsChange}
                name="email"
                placeholder="Email"
                onFocus={handleFocus}
              />
              <p className="color-red text-small">{error.email}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              <InputUi
                type="password"
                value={authData.password}
                onChange={handleFieldsChange}
                name="password"
                placeholder="Mật khẩu"
                onFocus={handleFocus}
              />
              <p className="color-red text-small">{error.password}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <InputUi
                type="password"
                value={authData.confirm_password}
                onChange={handleFieldsChange}
                name="confirm_password"
                placeholder="Xác nhận mật khẩu"
                onFocus={handleFocus}
              />
              <p className="color-red text-small">{error.confirm_password}</p>
            </Col>
          </Row>

          <p className="error-message">
            {isFailed && <span>Đăng ký thất bại</span>}
          </p>

          <FlatButtonBlueUi type="submit">Đăng ký</FlatButtonBlueUi>
        </form>
      </AuthWrapperUi>
    </>
  );
};

export const getServerSideProps = withUnAuth();

export default Register;
