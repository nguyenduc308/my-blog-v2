import React from 'react';

import Header from './header/header';
import { Row, Container } from '@/components/grid';

import { LayoutWrapperScreen, MainContentScreen } from './layout.styled';
import Footer from './footer/footer';
import { User } from 'interfaces/userModel';
import { useEffect, useState } from 'react';
import axios from '@/helpers/axios';

interface SiteNoSidebarLayoutProps {
  user?: User;
}

const SiteNoSidebarLayout: React.FC<SiteNoSidebarLayoutProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    axios
      .get('/users/me')
      .then((resp: any) => {
        if (resp.statusCode === 200) {
          setUser(resp.data);
        }
      })
      .catch(console.log);
  }, []);

  return (
    <LayoutWrapperScreen>
      <Header user={user} />

      <MainContentScreen>
        <Container>
          <main>{children}</main>
        </Container>
      </MainContentScreen>

      <Footer></Footer>
    </LayoutWrapperScreen>
  );
};

export default SiteNoSidebarLayout;
