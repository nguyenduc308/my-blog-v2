import React from 'react';

import { Logo } from '@/components/logo';
import { VerticalMenu } from '@/components/menu';

import { SidebarScreen } from './sidebar.styled';
import { uuid } from '@/helpers/utils';

const MENU = [
  { id: uuid(), label: 'Trang chủ', path: '' },
  {
    id: uuid(),
    label: 'Chuyên mục',
    path: '/chuyen-muc',
    subs: [
      { id: uuid(), label: 'Digital Marketing', path: '/digital-marketing' },
      { id: uuid(), label: 'Kiếm tiền online', path: '/kiem-tien-online' },
    ],
  },
  { id: uuid(), label: 'Bài viết', path: '/bai-viet' },
];

const Sidebar: React.FC = () => {
  return (
    <SidebarScreen>
      <Logo title="DigitalMarketing.Com" />
      <VerticalMenu items={MENU} />
    </SidebarScreen>
  );
};

export default Sidebar;
