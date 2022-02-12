import { User } from 'interfaces/userModel';
import { useState } from 'react';
import { LoginRequiredPopup } from '../login-popup';
import { Modal } from '../modals';
import { CommentInputWrapperUi } from './comment-input.styled';

export type PostingComment = '' | 'comment' | 'reply';

interface CommentInputProps {
  type: 'comment' | 'reply';
  onPostComment: Function;
  postingComment: PostingComment;
  user?: User;
}

const CommentInput: React.FC<CommentInputProps> = ({
  type,
  onPostComment,
  postingComment,
  user,
}) => {
  const [value, setValue] = useState('');
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);

  const handlePostComment = () => {
    onPostComment(value, type, setValue);
  };

  const handleFormInputClick = () => {
    if (!user) {
      setIsShowLoginPopup(true)
    }
  }

  return (
    <>
    <CommentInputWrapperUi onClick={handleFormInputClick}>
      <div className="cmt-input-avatar">
        <img
          src={user && user?.avatar_url ? user?.avatar_url : '/no-avatar.png'}
        />
      </div>
      <div className="cmt-input-body">
        <textarea
          className="cmt-input"
          value={value}
          placeholder={type === 'comment' ? 'Bình luận gì đó' : 'Trả lời'}
          onChange={(e) => setValue(e.target.value)}
          disabled={!user}
        ></textarea>
        <div className="cmt-input-meta">
          {value && (
            <button className="cmt-input-action" onClick={handlePostComment}>
              {postingComment === type && <span>Posting..</span>}
              {postingComment === '' && <span>Đăng</span>}
            </button>
          )}
        </div>
      </div>
    </CommentInputWrapperUi>
    <Modal 
    showModal={isShowLoginPopup} 
    onClose={() => {setIsShowLoginPopup(false)}}
    >
      <LoginRequiredPopup msg='Bạn cần đăng nhập để bình luận'></LoginRequiredPopup>
    </Modal>
    </>
  );
};

export default CommentInput;
