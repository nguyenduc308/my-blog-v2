import Head from 'next/head';

import { config } from '@resources/home';
import { SiteNoSidebarLayout } from '@/layouts';
import { Container, Row, Col } from '@/components/grid';
import { DlCard } from '@/components/dl-card';
import { DlCardRow } from '@/components/dl-card-row';
import { GetServerSideProps } from 'next';
import axiosInstance from '@/helpers/axios';
import { Modal } from '@/components/modals';

interface HomeProps {
  blogs: any;
}

const Home: ReactFCWithLayout<HomeProps> = ({ blogs }) => {
  console.log(blogs)
  return (
    <>
      <Head>
        <title>{config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* <Row>
          <Col sm="4">
            <DlCard />
          </Col>
          <Col sm="4">
            <DlCard />
          </Col>
          <Col sm="4">
            <DlCard />
          </Col>
        </Row> */}
        
        <Row style={{ marginTop: '40px' }}>
          <Col sm="9">
            {blogs &&
              blogs.map((blog: any, i: number) => (
                <div key={blog.id} style={{ marginTop: i > 0 ? '20px' : 0 }}>
                  <DlCardRow data={blog}></DlCardRow>
                </div>
              ))}
          </Col>
          <Col sm="3"></Col>
        </Row>
      </div>
    </>
  );
};
Home.Layout = SiteNoSidebarLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await axiosInstance.get('/blogs');

    return {
      props: {
        blogs: data,
      },
    };
  } catch {
    return {
      props: {
        blogs: null,
      },
    };
  }
};

export default Home;
