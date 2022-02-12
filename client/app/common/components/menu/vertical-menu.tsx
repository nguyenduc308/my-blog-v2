import React from 'react';
import Link from 'next/link';
import { MenuVerticalScreen } from './menu.styled';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  subs?: Array<MenuItem>;
}

interface VerticalMenuProps {
  items: Array<MenuItem>;
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({ items }) => {
  return (
    <MenuVerticalScreen>
      {items.map(({ id, label, path, subs }) => {
        return (
          <li key={id}>
            <Link href={path}>
              <a>{label}</a>
            </Link>
            {subs && (
              <ul>
                {subs.map(({ id: subId, label: subLabel, path: subPath }) => {
                  return (
                    <li id={subId}>
                      <Link href={subPath}>
                        <a>{subLabel}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </MenuVerticalScreen>
  );
};

export default VerticalMenu;
