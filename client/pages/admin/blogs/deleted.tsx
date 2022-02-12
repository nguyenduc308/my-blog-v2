import { useEffect, useRef, useState } from 'react';
import Select, { OptionsType } from 'react-select';
import Link from 'next/link';

import axios from '@/helpers/axios';
import { AdminLayout } from '@/layouts';
import {
  BlogListAdminUi,
  BlogListHeaderAdminUi,
  BlogListBodyAdminUi,
} from '@resources/admin/blog-list.styled';
import { TableListUi } from '@/components/table-list/table-list.styled';
import Head from 'next/head';
import { withAuth } from '@/helpers/withAuth';

const BlogsDeletedAdmin: ReactFCWithLayout = () => {
  const list = Array.from({ length: 5 }).fill(1);

  return (
    <>
      <Head>
        <title>Danh sách bài đã xoá</title>
      </Head>
      <BlogListAdminUi>
        <BlogListHeaderAdminUi>
          <h3>Danh sách bài viết</h3>
        </BlogListHeaderAdminUi>
        <BlogListBodyAdminUi>
          <TableListUi>
            <div className="t-row t-head">
              <div className="t-col no">#</div>
              <div className="t-col infor">Thông tin</div>
              <div className="t-col status">Tình trạng</div>
              <div className="t-col cat">Chủ đề</div>
              <div className="t-col control">Thao tác</div>
            </div>
            {list &&
              list.map((blog, i) => (
                <div className="t-row" key={Math.random()}>
                  <div className="t-col no">{i + 1}</div>
                  <div className="t-col infor">
                    <div className="infor__left">
                      <img src="/default-img.gif" />
                    </div>
                    <div className="infor__right">
                      <Link href="/admin/blogs/1">
                        <a>
                          <h5 className="title">Đây là tiêu đề</h5>
                        </a>
                      </Link>
                      <div className="meta">
                        <p className="line author">
                          <i className="far fa-user"></i>{' '}
                          <span className="value">DucLux</span>
                        </p>
                        <p className="line time">
                          <i className="far fa-clock"></i>
                          <span className="value">30/08/2010</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="t-col status">
                    <span className="public">Xuất bản</span>
                  </div>
                  <div className="t-col cat">
                    <span className="cat-item">Angular</span>
                    <span className="cat-item">React</span>
                    <span className="cat-item">VueJs</span>
                  </div>
                  <div className="t-col control">
                    <i className="icon far fa-trash-alt"></i>
                  </div>
                </div>
              ))}
          </TableListUi>
        </BlogListBodyAdminUi>
      </BlogListAdminUi>
    </>
  );
};

BlogsDeletedAdmin.Layout = AdminLayout;

export const getServerSideprops = withAuth({
  shoudRedirectPath: '/auth/login',
});

export default BlogsDeletedAdmin;
