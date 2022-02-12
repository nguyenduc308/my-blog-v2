import Head from 'next/head';
import axiosInstance from '@/helpers/axios';
import { SiteNoSidebarLayout } from '@/layouts';
import { GetServerSideProps } from 'next';

import {
  BlogArticleUi,
  ArticleWrapperUi,
  ArticleInnerUi,
  ArticleHeaderUi,
} from '@resources/blog/blog.styled';
import { Row, Col } from '@/components/grid';
import { BlockHtml } from '@/components/block-html';
import PostCount from '@/components/post-count/post-count-area';
import { User } from 'interfaces/userModel';
import { useState } from 'react';
import { Comment, Like } from 'interfaces/metaModel';
import CommentItem from '@/components/comment/comment-item';
import CommentInput, {
  PostingComment,
} from '@/components/comment/comment-input';

interface BlogProps {
  blog: any;
  user?: User;
}

const Blog: ReactFCWithLayout<BlogProps> = ({ blog, user }) => {
  console.log(blog);
  const [likes, setLikes] = useState<Array<Like>>(blog.likes);
  const [comments, setComments] = useState<Comment[]>(blog.comments || []);
  const [postingComment, setPostingComment] = useState<PostingComment>('');

  const [conversation, setConversation] = useState({
    comment_id: 0,
    content: '',
  });

  const handleLike = (isLike: boolean) => {
    axiosInstance.post(`/blogs/${blog.id}/like`).then(() => {
      setLikes(
        isLike
          ? [...likes, { type: 'like', user_id: user?.id }]
          : likes.filter((like) => like.user_id !== user?.id),
      );
    });
  };

  const onPostComment = (
    content: string,
    type: 'comment' | 'reply',
    setValue: Function,
  ) => {
    setPostingComment(type);
    axiosInstance
      .post('/comments', {
        blog_id: blog.id,
        content,
        ...(type === 'reply' ? { comment_id: conversation.comment_id } : {}),
      })
      .then((resp: any) => {
        if (type === 'comment') {
          setComments([...comments, { ...resp.data, children: [] }]);
        } else {
          setComments(
            comments.map((cmt) => {
              return cmt.id === conversation.comment_id
                ? {
                    ...cmt,
                    children: [...cmt.children, resp.data],
                  }
                : cmt;
            }),
          );
        }
        setValue('');
      })
      .finally(() => setPostingComment(''));
  };

  const onReplyComment = (id: number) => {
    setConversation({
      comment_id: id,
      content: '',
    });
  };

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <Row className="mt-1">
        <Col sm="9" xl="8">
          <ArticleWrapperUi>
            <ArticleHeaderUi>
              <h1 className="title">{blog.title}</h1>
              <p className="excerpt">{blog.excerpt}</p>
            </ArticleHeaderUi>
            <ArticleInnerUi>
              <PostCount
                likes={likes}
                user={user}
                view={blog.view}
                likeCallback={handleLike}
              ></PostCount>
              <BlogArticleUi>
                <article>
                  {blog.blocks.data.map((block: any) => {
                    return <BlockHtml key={block.id} block={block} />;
                  })}
                </article>

                <div className="comment-list">
                  <CommentInput
                    user={user}
                    postingComment={postingComment}
                    type="comment"
                    onPostComment={onPostComment}
                  ></CommentInput>
                  <div className="list">
                    {comments &&
                      comments.map((cmt: any) => {
                        return (
                          <CommentItem
                            key={cmt.id}
                            data={cmt}
                            onReplyComment={onReplyComment}
                            user={user}
                          >
                            {cmt.children &&
                              cmt.children.map((child: any) => {
                                return (
                                  <CommentItem
                                    user={user}
                                    key={child.id}
                                    parentId={cmt.id}
                                    data={child}
                                    onReplyComment={onReplyComment}
                                  ></CommentItem>
                                );
                              })}
                            {(conversation.comment_id === cmt.id ||
                              cmt.children?.some(
                                ({ id }: any) => conversation.comment_id === id,
                              )) && (
                              <CommentInput
                                user={user}
                                postingComment={postingComment}
                                type="reply"
                                onPostComment={onPostComment}
                              ></CommentInput>
                            )}
                          </CommentItem>
                        );
                      })}
                  </div>
                </div>
              </BlogArticleUi>
            </ArticleInnerUi>
          </ArticleWrapperUi>
        </Col>
        <Col sm="4" xl="3"></Col>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookie = ctx.req?.headers?.cookie;

    let { data } = await axiosInstance.get('/blogs/' + ctx.params?.slug);
    console.log('hi', ctx.params?.slug, data);
    let { data: user }: any = await axiosInstance
      .get('/users/me', {
        headers: ctx.req && cookie ? { cookie } : undefined,
      })
      .catch((res) => ({}));

    return {
      props: {
        blog: data || null,
        user: user || null,
      },
    };
  } catch (err) {
    return {
      props: {
        blog: null,
      },
    };
  }
};

Blog.Layout = SiteNoSidebarLayout;

export default Blog;
