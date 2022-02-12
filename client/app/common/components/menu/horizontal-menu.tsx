import React from 'react';
import Link from 'next/link';
import { MenuHorizontalScreen, SubmenuHorizontalScreen } from './menu.styled';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  subs?: Array<MenuItem>;
}

interface HorizontalMenuProps {
  items: Array<MenuItem>;
}

const HorizontalMenu: React.FC<HorizontalMenuProps> = ({ items }) => {
  return (
    <MenuHorizontalScreen>
      {items.map(({ id, label, path, subs }) => {
        return (
          <li key={id}>
            <Link href={path}>
              <a>{label}</a>
            </Link>
            {subs && (
              <SubmenuHorizontalScreen>
                {subs.map(({ id: subId, label: subLabel, path: subPath }) => {
                  return (
                    <li key={subId}>
                      <Link href={subPath}>
                        <a>{subLabel}</a>
                      </Link>
                    </li>
                  );
                })}
              </SubmenuHorizontalScreen>
            )}
          </li>
        );
      })}
    </MenuHorizontalScreen>
  );
};

export default HorizontalMenu;
