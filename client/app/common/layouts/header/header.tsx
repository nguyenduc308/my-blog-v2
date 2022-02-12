import { Container } from '@/components/grid';
import { Logo } from '@/components/logo';
import { HorizontalMenu } from '@/components/menu';
import { uuid } from '@/helpers/utils';
import { User } from 'interfaces/userModel';
import React from 'react';
import Link from 'next/link';
import axios from '@/helpers/axios';

import {
  HeaderScreen,
  HeaderTopScreen,
  HeaderBottomScreen,
  LogoWrapperScreen,
  HeaderTopContentScreen,
} from './header.styled';

const MENU = [{ id: uuid(), label: 'Trang chủ', path: '/' }];

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const logout = () => {
    axios.get('/auth/logout').then(() => {
      location.reload();
    });
  };
  return (
    <HeaderScreen>
      <HeaderTopScreen>
        <Container>
          <HeaderTopContentScreen>
            <LogoWrapperScreen>
              <Link href="/">
                <a>
                  <Logo title="Duclux.Com" imageUrl="/logo-cli.png" />
                </a>
              </Link>
            </LogoWrapperScreen>
            <div>
              {!user && (
                <Link href="/auth/login">
                  <a>Đăng nhập</a>
                </Link>
              )}
              {user && (
                <>
                  <span>
                    Hi, <strong>{user.last_name}</strong>
                  </span>{' '}
                  /{' '}
                  <span className="pointer" onClick={logout}>
                    Logout
                  </span>
                </>
              )}
            </div>
          </HeaderTopContentScreen>
        </Container>
      </HeaderTopScreen>
      {/* <HeaderBottomScreen>
        <Container>
          <HorizontalMenu items={MENU} />
        </Container>
      </HeaderBottomScreen> */}
    </HeaderScreen>
  );
};

export default Header;
