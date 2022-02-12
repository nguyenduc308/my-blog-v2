import { useEffect, useRef, useState } from 'react';
import Select, { OptionsType } from 'react-select';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import axios from '@/helpers/axios';
import { AdminLayout } from '@/layouts';
import {
  EditBlogWrapperScreen,
  EditBlogContentAreaScreen,
  EditBlogTitleInputScreen,
  EditBlogContentInputScreen,
  EditBlogControlsAreaScreen,
  EditBlogUploadImageScreen,
  EditBlogCategoriesScreen,
  EditBlogExcerptScreen,
} from '@resources/admin/edit-blog.styled';
import { Row, Col } from '@/components/grid';
import { FlatButtonGreenUi } from '@/components/buttons/flat-button.styled';
import { CircleSpinner } from '@/components/spinners';
import { TextAreaUi } from '@/components/inputs';
import { Collapse } from '@/components/collapse';
import { API, OutputBlockData, OutputData } from '@editorjs/editorjs';
import Head from 'next/head';
import { withAuth } from '@/helpers/withAuth';

const CustomEditor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
});

const EditBlogAdmin: ReactFCWithLayout = () => {
  const inputImageref = useRef<HTMLInputElement>(null);

  const [blog, setBlog] = useState<any>({
    title: '',
    image_url: '',
    status: 1,
    excerpt: '',
    category_ids: [],
    blocks: {
      id: 0,
      blocks: [],
    },
    show_image: true,
  });

  const [editorOutput, setEditorOutput] = useState<any>({
    time: Date.now(),
    blocks: [],
    version: '2.22.2',
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [defaultCate, setDefaultCate] = useState<any>([]);

  const router = useRouter();

  const handleFieldChange = (fieldName: string) => (event: any) => {
    setBlog({
      ...blog,
      [fieldName]: event.target.value,
    });
  };

  const handleSelectCategories = (
    options: OptionsType<{ value: number; label: string }>,
  ) => {
    setBlog({
      ...blog,
      category_ids: options.map((options) => options.value),
    });

    setDefaultCate(options);
  };

  const openInputImage = () => {
    inputImageref?.current?.click();
  };
  const uploadImage = (event: any) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    axios({
      method: 'POST',
      data: formData,
      url: '/upload/images',
      headers: {
        'Content-type': 'multipart/form-data',
      },
    }).then(({ file }: any) => setBlog({ ...blog, imageUrl: file.url }));
  };

  const saveData = () => {
    if (isSubmiting) {
      return;
    }

    axios
      .put('/blogs/' + blog.id, {
        ...blog,
        blocks: {
          ...blog.blocks,
          data: editorOutput.blocks,
        },
      })
      .then((data: any) => {
        console.log(data);
      })
      .catch(console.log)
      .finally(() => setIsSubmiting(false));
  };

  const onContentChange = (editorApi: API, ouput?: OutputData) => {
    if (ouput) {
      setEditorOutput(ouput);
    }
  };

  useEffect(() => {
    if (router.query.slug) {
      Promise.all([
        axios.get('/blogs/' + router.query.slug),
        axios.get('/categories')
      ])
      .then(([resp, respCate]) => {
        setBlog({
          ...resp.data,
          category_ids: resp.data.categories.map(({id}) => id)
        });

        setCategories(
          respCate.data.map((cat: any) => ({ value: cat.id, label: cat.name })),
        );

        // setDefaultCate(respCate.data.filter(({id}) => resp.data.categories.map(({id}) => id).inclues(id)));

        const dataBlocks: OutputBlockData<string, any>[] =
          resp.data.blocks.data;

        setEditorOutput({
          ...editorOutput,
          blocks: dataBlocks,
          time: Date.now(),
        });
      });
    }
  }, [router.query.slug]);

  return (
    <>
      <Head>
        <title>Chỉnh sửa bài viết</title>
      </Head>
      <EditBlogWrapperScreen>
        <Row>
          <Col sm="9">
            <EditBlogContentAreaScreen>
              <EditBlogTitleInputScreen
                value={blog.title}
                onChange={handleFieldChange('title')}
                placeholder="Tiêu đề bài viết"
              />
              <EditBlogContentInputScreen>
                {editorOutput.blocks.length && (
                  <CustomEditor
                    data={editorOutput}
                    onChange={onContentChange}
                  />
                )}
              </EditBlogContentInputScreen>
            </EditBlogContentAreaScreen>
          </Col>
          <Col sm="3">
            <EditBlogControlsAreaScreen>
              <FlatButtonGreenUi onClick={saveData}>
                {isSubmiting && <CircleSpinner />}
                {!isSubmiting && <span>Cập nhật</span>}
              </FlatButtonGreenUi>

              <Collapse title="Chủ đề" active className="mt-4">
                <EditBlogCategoriesScreen>
                  <Select
                    isMulti
                    value={defaultCate}
                    closeMenuOnSelect={false}
                    options={categories}
                    onChange={handleSelectCategories}
                  />
                </EditBlogCategoriesScreen>
              </Collapse>

              <Collapse title="Mô tả" className="mt-1">
                <EditBlogExcerptScreen>
                  <TextAreaUi
                    value={blog.excerpt}
                    onChange={handleFieldChange('excerpt')}
                    placeholder="Blog excerpt"
                  />
                </EditBlogExcerptScreen>
              </Collapse>

              <Collapse title="Ảnh mô tả" className="mt-1">
                <EditBlogUploadImageScreen onClick={openInputImage}>
                  {!blog.image_url && <span>No Image</span>}
                  {blog.image_url && <img src={blog.image_url} />}

                  <input
                    hidden
                    type="file"
                    ref={inputImageref}
                    onChange={uploadImage}
                  />
                </EditBlogUploadImageScreen>
                <label htmlFor="show_image">
                  <input
                    type="checkbox"
                    id="show_image"
                    checked={blog.show_image}
                    onChange={() =>
                      setBlog({ ...blog, show_image: !blog.show_image })
                    }
                  />
                  Hiển thị hình ảnh
                </label>
              </Collapse>
            </EditBlogControlsAreaScreen>
          </Col>
        </Row>
      </EditBlogWrapperScreen>
    </>
  );
};

EditBlogAdmin.Layout = AdminLayout;

export const getServerSideProps = withAuth({
  shoudRedirectPath: '/auth/login',
});

export default EditBlogAdmin;
