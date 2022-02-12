import { useState, useEffect, useCallback } from 'react';
import { User } from 'interfaces/userModel';
import {
  PostCountWrapperUi,
  LikeAreaUi,
  ViewAreaUi,
} from './post-count-area.styled';
import { useRef } from 'react';
import { Like } from 'interfaces/metaModel';

interface PostCountProps {
  likes: Array<Like>;
  view: { count: number };
  user?: User;
  likeCallback: Function;
}

const PostCount: React.FC<PostCountProps> = ({
  likes,
  user,
  view,
  likeCallback,
}) => {
  const isUserHasLike =
    !!user && !!likes.find((like) => like.user_id === user.id);

  const [isLike, setLike] = useState(isUserHasLike);

  const timeId = useRef<any>(null);
  const firstTimeRef = useRef(false);

  const handleLike = () => {
    if (!user) {
      return;
    }
    setLike(!isLike);
  };

  useEffect(() => {
    if (!firstTimeRef.current) {
      firstTimeRef.current = true;
      return;
    }

    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    timeId.current = setTimeout(() => {
      if (isLike !== isUserHasLike) {
        likeCallback(isLike);
      }
    }, 500);
  }, [isLike]);

  return (
    <PostCountWrapperUi>
      <LikeAreaUi>
        <div className="add-reaction" onClick={handleLike}>
          {isLike ? (
            <i className="color-red fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </div>
        <div className="count">{likes.length}</div>
      </LikeAreaUi>
      <ViewAreaUi>
        <div className="view-icon">
          <i className="far fa-eye"></i>
        </div>
        <div className="count">{view.count}</div>
      </ViewAreaUi>
    </PostCountWrapperUi>
  );
};

export default PostCount;
