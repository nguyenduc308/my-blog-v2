import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AdminBodyScreen,
  AdminSidebarScreen,
  AdminWrapperScreen,
  AdminMenuScreen,
  AdminLogoScreen,
  SubmenuScreen,
} from './layout.styled';
import { User } from 'interfaces/userModel';

const menuSchema: any = {
  blog: [
    { label: 'Viết bài', link: '/admin/blogs/create' },
    { label: 'Danh sách', link: '/admin/blogs' },
    { label: 'Đã xoá', link: '/admin/blogs/deleted' },
  ],
  category: [{ label: 'Danh sách', link: '/admin/categories' }],
  serial: [{ label: 'Danh sách', link: '/admin/serials' }],
};
const indexs: any = {
  blog: 0,
  category: 1,
  serial: 2,
};

interface AdminLayoutProps {
  user?: User;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user }) => {
  console.log('admin layout', user);
  const [menuActive, setMenuActive] = useState('');

  const [submenu, setSubmenu] = useState(menuSchema.blog);

  const handleSetMenuActive = (name: string) => () => {
    setMenuActive(name === menuActive ? '' : name);
  };

  const router = useRouter();

  useEffect(() => {
    if (menuActive) {
      setSubmenu(menuSchema[menuActive]);
    }
  }, [menuActive]);

  useEffect(() => {
    // const pathArr = router.pathname.split('/')
    // setMenuActive(pathArr[pathArr.length - 1])
  }, [router])

  return (
    <div className="wrapper">
      <AdminWrapperScreen>
        <AdminSidebarScreen active={!!menuActive}>
          <AdminLogoScreen>
            <div>
              <img src="/logo.png" />
            </div>
          </AdminLogoScreen>
          <div className="menu">
            <div
              className={'menu-item' + (menuActive == 'blog' ? ' active' : '')}
              title="Blogs"
              onClick={handleSetMenuActive('blog')}
            >
              <svg
                height="30px"
                viewBox="0 0 511 511.9996"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m444.464844 4.394531c-5.855469-5.859375-15.355469-5.859375-21.210938 0l-115.605468 115.605469h-262.148438c-24.8125 0-45 20.1875-45 45v209.996094c0 24.816406 20.1875 45 45 45h16v77c0 6.097656 3.691406 11.589844 9.335938 13.890625 5.726562 2.335937 12.183593.894531 16.386718-3.398438l85.585938-87.492187h174.691406c24.8125 0 45-20.183594 45-45v-170.144532l115.605469-115.605468c5.855469-5.859375 5.855469-15.355469 0-21.214844zm-137.886719 243.949219-42.425781-42.425781 127.28125-127.277344 42.425781 42.425781zm-58.40625-15.980469 31.960937 31.960938-54.78125 22.820312zm114.328125 142.632813c0 8.273437-6.730469 15-15 15h-181c-4.035156 0-7.902344 1.628906-10.722656 4.511718l-64.277344 65.707032v-55.21875c0-8.28125-6.714844-15-15-15h-31c-8.269531 0-15-6.726563-15-15v-209.996094c0-8.273438 6.730469-15 15-15h232.144531l-45.3125 45.3125c-1.25 1.25-2.488281 2.972656-3.3125 5.011719l-41.519531 99.675781h-81c-8.285156 0-15 6.714844-15 15 0 8.28125 6.714844 14.988281 15 14.988281h90.992188.011718c1.929688 0 4-.394531 5.894532-1.207031l108.773437-45.304688c1.8125-.707031 3.640625-1.9375 5.015625-3.3125l45.3125-45.3125zm92.570312-275.144532-42.425781-42.425781 21.214844-21.210937 42.425781 42.425781zm0 0" />
              </svg>
            </div>
            <div
              className={
                'menu-item' + (menuActive == 'category' ? ' active' : '')
              }
              title="Categories"
              onClick={handleSetMenuActive('category')}
            >
              <svg
                height="25px"
                viewBox="0 -17 512 512"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m494.425781 70.609375c-11.332031-11.328125-26.394531-17.570313-42.414062-17.570313-.003907 0-.007813 0-.011719 0l-193.703125-.003906c-5.4375.054688-10.40625-2.59375-13.328125-6.972656l-30.710938-46.0625h-154.257812c-33.085938 0-60 26.914062-60 60v322.074219c0 33.082031 26.914062 60 60 60h204v-40h-204c-11.027344 0-20-8.972657-20-20v-216.03125c0-5.34375 2.082031-10.363281 5.859375-14.144531 3.777344-3.773438 8.796875-5.855469 14.144531-5.855469h.003906l153.515626-.007813 31.285156-45.519531.15625-.230469c2.84375-4.269531 8.207031-7.25 13.035156-7.25v-.003906c.066406 0 .136719.003906.207031.003906h.136719l193.660156.003906c5.339844 0 10.359375 2.078126 14.136719 5.855469 3.777344 3.777344 5.859375 8.800781 5.859375 14.140625v200h40v-200c0-16.027344-6.242188-31.09375-17.574219-42.425781zm-282.65625 7.355469-19.292969 28.070312-132.464843.007813c-.003907 0-.007813 0-.011719 0-6.921875 0-13.660156 1.167969-20 3.40625v-49.449219c0-11.027344 8.972656-20 20-20h132.851562l18.835938 28.253906c1.148438 1.722656 2.398438 3.355469 3.714844 4.921875-1.285156 1.527344-2.511719 3.117188-3.632813 4.789063zm216.230469 275.070312h84v40h-84v84h-40v-84h-84v-40h84v-84h40zm0 0" />
              </svg>
            </div>
            <div
              className={
                'menu-item' + (menuActive == 'serial' ? ' active' : '')
              }
              title="Serial"
              onClick={handleSetMenuActive('serial')}
            >
              <svg
                version="1.1"
                width="25px"
                height="25px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 427.1 427.1"
              >
                <g>
                  <g>
                    <path
                      d="M93.55,156.5c-31.5,0-57,25.5-57,57s25.5,57,57,57s57-25.5,57-57C150.45,182.1,124.95,156.6,93.55,156.5z M93.55,250.5
			c-20.4,0-37-16.5-37-37c0-20.4,16.5-37,37-37c20.4,0,37,16.5,37,37C130.45,233.9,113.95,250.4,93.55,250.5z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M380.55,172.5h-203.5c-5.5,0-10,4.5-10,10s4.5,10,10,10h203.5c5.5,0,10-4.5,10-10S386.05,172.5,380.55,172.5z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M286.65,234.5h-109.6c-5.5,0-10,4.5-10,10s4.4,10,10,10h109.6c5.5,0,10-4.5,10-10S292.15,234.5,286.65,234.5z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M93.55,0c-31.5,0-57,25.5-57,57s25.5,57,57,57s57-25.5,57-57C150.45,25.5,124.95,0,93.55,0z M93.55,93.9
			c-20.4,0-37-16.5-37-37s16.5-37,37-37c20.4,0,37,16.5,37,37C130.45,77.4,113.95,93.9,93.55,93.9z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M380.55,15.5h-203.5c-5.5,0-10,4.5-10,10s4.5,10,10,10h203.5c5.5,0,10-4.5,10-10S386.05,15.5,380.55,15.5z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M286.65,78.5h-109.6c-5.5,0-10,4.5-10,10s4.4,10,10,10h109.6c5.5,0,10-4.5,10-10S292.15,78.5,286.65,78.5z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M93.55,313.1c-31.5,0-57,25.5-57,57s25.5,57,57,57s57-25.5,57-57C150.45,338.6,124.95,313.1,93.55,313.1z M93.55,407
			c-20.4,0-37-16.5-37-37c0-20.4,16.5-37,37-37c20.4,0,37,16.5,37,37C130.45,390.5,113.95,407,93.55,407z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M380.55,328.5h-203.5c-5.5,0-10,4.5-10,10s4.5,10,10,10h203.5c5.5,0,10-4.5,10-10S386.05,328.5,380.55,328.5z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M286.65,391.5h-109.6c-5.5,0-10,4.5-10,10s4.5,10,10,10h109.6c5.5,0,10-4.5,10-10S292.15,391.5,286.65,391.5z" />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </div>
          </div>
        </AdminSidebarScreen>

        {menuActive && (
          <AdminMenuScreen>
            <SubmenuScreen
              style={{
                marginTop: `calc(100px + ${
                  menuActive ? indexs[menuActive] * 60 : 0
                }px)`,
              }}
            >
              <ul className="sub-list">
                {submenu &&
                  submenu.map((item: any) => (
                    <li className="sub-item" key={item.label}>
                      <Link href={item.link}>
                        <a>{item.label}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </SubmenuScreen>
          </AdminMenuScreen>
        )}

        <AdminBodyScreen style={{ width: `calc(100% - 250px)` }}>
          <main>{children}</main>
        </AdminBodyScreen>
      </AdminWrapperScreen>
    </div>
  );
};

export default AdminLayout;
