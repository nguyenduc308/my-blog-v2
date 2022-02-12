import Link from 'next/link';
import Blog from 'pages/[slug]';
import React from 'react';
import { AspectImageFrame } from '../aspect-image-frame';
import {
  DlCardRowScreen,
  DLCardRowImageScreen,
  DlCardRowBodyScreen,
} from './dl-card-row.styled';

interface DLCardRowProps {
  data: any;
}

const DLCardRow: React.FC<DLCardRowProps> = ({ data }) => {
  const { image_url, title, slug } = data;
  const category = data.categories[0];
  const serial = data.serials[0];
  return (
    <DlCardRowScreen>
      <DLCardRowImageScreen>
        <Link href={'/' + slug}>
          <a>
            <AspectImageFrame ratio={3 / 4} contain={true}>
              <img src={image_url || '/default-img.gif'} />
            </AspectImageFrame>
          </a>
        </Link>
      </DLCardRowImageScreen>
      <DlCardRowBodyScreen>
        { category && <div className="top">
          <Link href="#">
            <a>{category.name}</a>
          </Link>
        </div>
        }
        <Link href={'/' + slug}>
          <a>
            <h2 className="title">{title}</h2>
          </a>
        </Link>
        {serial && <div className="serial">
          <span>Serial: </span>
          <Link href={serial.slug}>
            <a>{serial.title}</a>
          </Link>
        </div>}
        <div className="footer">
          <div className="meta">
            <div className="meta__author">Đăng bởi {data.user.last_name} {data.user.first_name}</div>
            <div className="meta__time">9 phút đọc</div>
          </div>
          <Link href={'/' + slug}>
            <a className="readmore">
              Đọc tiếp <i className="fa fa-chevron-circle-right" />
            </a>
          </Link>
        </div>
      </DlCardRowBodyScreen>
    </DlCardRowScreen>
  );
};

export default DLCardRow;
