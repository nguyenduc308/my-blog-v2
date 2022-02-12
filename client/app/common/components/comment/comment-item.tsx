import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import vi from 'date-fns/locale/vi';
import { useState } from 'react';

import { Comment } from 'interfaces/metaModel';
import { CommentWrapperUi } from './comment-item.styled';
import { Modal } from '../modals';
import { LoginRequiredPopup } from '../login-popup';
import { User } from 'interfaces/userModel';

interface CommentItemProps {
  data: Comment;
  onReplyComment?: Function;
  parentId?: number;
  user?: User;
}

const CommentItem: React.FC<CommentItemProps> = ({
  children,
  onReplyComment,
  data,
  parentId,
  user,
}) => {
  const [isShowModalLogin, setIsShowModalLogin] = useState(false);
  const onClickReply = () => {
    if (!user) {
      setIsShowModalLogin(true);
      return;
    }

    onReplyComment && onReplyComment(parentId ? parentId : data.id);
  };

  return (
    <>
    <CommentWrapperUi>
      <div className="cmt-avatar">
        <img src={data?.user?.avatar_url || '/no-avatar.png'} />
      </div>
      <div className="cmt-body">
        <div className="cmt-header">
          <span className="name">
            {data?.user?.last_name
              ? data?.user?.last_name + ' ' + data?.user?.first_name
              : 'Anonymos'}
          </span>
        </div>
        <div className="cmt-content">{data.content}</div>
        <div className="cmt-meta">
          <span className="action" onClick={onClickReply}>
            Trả lời
          </span>
          <span className="time">
            {formatDistanceToNowStrict(new Date(data.created_at), {
              locale: vi,
            })}{' '}
            trước
          </span>
        </div>
        <div className="children">{children}</div>
      </div>
    </CommentWrapperUi>
    <Modal showModal={isShowModalLogin} onClose={() => setIsShowModalLogin(false)}>
      <LoginRequiredPopup msg="Bạn cần đăng nhập để trả lời bình luận"></LoginRequiredPopup>
    </Modal>
    </>
  );
};

export default CommentItem;
