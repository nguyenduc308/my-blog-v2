import { useState, useEffect } from 'react';

import { AdminLayout } from '@/layouts';
import { CircleSpinner } from '@/components/spinners';
import { InputUi } from '@/components/inputs/input.styled';
import { FlatButtonGreenUi } from '@/components/buttons/flat-button.styled';

import {
  CategoriesListUi,
  CategoriesBodyUi,
  CategoriesHeaderUi,
  CategoriesWrapperUi,
  CreateCategoryBoxUi,
} from '@resources/admin/categories-list.styled';
import { withAuth } from '@/helpers/withAuth';
import axios from '@/helpers/axios';

const CategoriesAdmin: ReactFCWithLayout = () => {
  const [categories, setCategories] = useState<any>([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [category, setCategory] = useState({
    name: '',
    color: '',
    bg_color: '',
    status: 'public',
  });

  useEffect(() => {
    axios.get('/categories').then((resp: any) => {
      if (resp.statusCode == 200) {
        setCategories(resp.data);
      }
    });
  }, []);

  const onSubmit = (event: any) => {
    if (isSubmiting) {
      return;
    }

    setIsSubmiting(true);
    axios
      .post('/categories', category)
      .then((resp: any) => {
        setCategories([resp.data, ...categories]);
      })
      .finally(() => setIsSubmiting(false));
  };

  const handleFieldChange = (event: any) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <CategoriesWrapperUi>
      <CategoriesHeaderUi>
        <h3>Danh sách chủ đề</h3>
      </CategoriesHeaderUi>
      <CategoriesBodyUi>
        <CreateCategoryBoxUi>
          <InputUi
            name="name"
            placeholder="Tên chủ đề"
            onChange={handleFieldChange}
          />
          <InputUi
            name="color"
            placeholder="Màu sắc"
            onChange={handleFieldChange}
          />
          <InputUi
            name="bg_color"
            placeholder="Màu nền"
            onChange={handleFieldChange}
          />
          <FlatButtonGreenUi onClick={onSubmit}>
            {isSubmiting && <CircleSpinner />}
            {!isSubmiting && <span>Tạo</span>}
          </FlatButtonGreenUi>
        </CreateCategoryBoxUi>
        <CategoriesListUi>
          {categories &&
            categories.map((cat: any) => {
              return (
                <div className="cat-item" key={cat.id}>
                  {cat.name}
                </div>
              );
            })}
        </CategoriesListUi>
      </CategoriesBodyUi>
    </CategoriesWrapperUi>
  );
};

CategoriesAdmin.Layout = AdminLayout;

export const getServerSideProps = withAuth();

export default CategoriesAdmin;
