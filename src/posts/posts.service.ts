import { Injectable, NotFoundException } from '@nestjs/common';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'John Doe',
    title: 'My first post',
    content: 'This is my first post',
    likeCount: 110,
    commentCount: 110,
  },
  {
    id: 2,
    author: 'John Doe',
    title: 'My first post',
    content: 'This is my first post',
    likeCount: 110,
    commentCount: 110,
  },
  {
    id: 3,
    author: 'John Doe',
    title: 'My first post',
    content: 'This is my first post',
    likeCount: 110,
    commentCount: 110,
  },
];

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(id: number, author?: string, title?: string, content?: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return posts;
  }

  deletePost(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    posts = posts.filter((post) => post.id !== +id);

    return posts;
  }
}
