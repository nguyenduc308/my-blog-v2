import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Select, { OptionsType } from 'react-select';

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

const BlogsAdmin: ReactFCWithLayout = ({ user }: any) => {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    axios.get('/blogs').then((data: any) => {
      setList(data.data);
    });
  }, []);

  const handleDeleteBlog = (blogId: number) => {
    axios.delete('/blogs/' + blogId).then((resp: any) => {
      if (resp.statusCode === 200) {
        setList(list.filter((item: any) => item.id !== blogId));
      }
    });
  };

  return (
    <>
      <Head>
        <title>Danh sách bài viết</title>
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
              list.map((blog: any, i: number) => (
                <div className="t-row" key={Math.random()}>
                  <div className="t-col no">{i + 1}</div>
                  <div className="t-col infor">
                    <div className="infor__left">
                      <Link href={'/admin/blogs/' + blog.slug}>
                        <a>
                          <img src={blog.image_url || '/default-img.gif'} />
                        </a>
                      </Link>
                    </div>
                    <div className="infor__right">
                      <Link href={'/admin/blogs/' + blog.slug}>
                        <a>
                          <h5 className="title">{blog.title}</h5>
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
                    {blog.categories.map(cat => <span key={cat.id} className="cat-item">{cat.name}</span>)}
                  </div>
                  <div className="t-col control">
                    <i
                      className="icon far fa-trash-alt"
                      onClick={() => handleDeleteBlog(blog.id)}
                    ></i>
                  </div>
                </div>
              ))}
          </TableListUi>
        </BlogListBodyAdminUi>
      </BlogListAdminUi>
    </>
  );
};

BlogsAdmin.Layout = AdminLayout;

export const getServerSideProps = withAuth({
  shoudRedirectPath: '/auth/login',
});

export default BlogsAdmin;
