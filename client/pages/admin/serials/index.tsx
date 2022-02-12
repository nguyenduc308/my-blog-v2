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
import SerialTable from '@/components/tables/serial-table';

const SerialsAdmin: ReactFCWithLayout = () => {
  const [serials, setSerials] = useState<any>([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [serial, setSerial] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    axios.get('/serials').then((resp: any) => {
      if (resp.statusCode == 200) {
        setSerials(resp.data);
      }
    });
  }, []);

  const onSubmit = (event: any) => {
    if (isSubmiting) {
      return;
    }

    setIsSubmiting(true);
    axios
      .post('/serials', serial)
      .then((resp: any) => {
        setSerials([resp.data, ...serials]);
      })
      .finally(() => setIsSubmiting(false));
  };

  const handleFieldChange = (event: any) => {
    setSerial({
      ...serial,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <CategoriesWrapperUi>
      <CategoriesHeaderUi>
        <h3>Danh sách serial</h3>
      </CategoriesHeaderUi>
      <CategoriesBodyUi>
        <CreateCategoryBoxUi>
          <InputUi
            name="title"
            placeholder="Tiêu đề"
            onChange={handleFieldChange}
          />
          <InputUi
            name="description"
            placeholder="Mô tả"
            onChange={handleFieldChange}
          />
          <InputUi
            name="imageUrl"
            placeholder="Hình ảnh"
            onChange={handleFieldChange}
          />
          <FlatButtonGreenUi onClick={onSubmit}>
            {isSubmiting && <CircleSpinner />}
            {!isSubmiting && <span>Tạo</span>}
          </FlatButtonGreenUi>
        </CreateCategoryBoxUi>
        <CategoriesListUi>
          {serials &&
            serials.map((serial: any) => {
              return (
                <SerialTable key={serial.id} data={serial}></SerialTable>
              );
            })}
        </CategoriesListUi>
      </CategoriesBodyUi>
    </CategoriesWrapperUi>
  );
};

SerialsAdmin.Layout = AdminLayout;

export const getServerSideProps = withAuth();

export default SerialsAdmin;
