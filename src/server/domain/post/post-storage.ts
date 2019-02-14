export interface Post {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string
  };
}

export function getPost(id: string): Post | null {
  return posts.find((post) => post.id === id) || null;
}

export function getPosts(): Post[] {
  return posts;
}

export function createPost(title: string, text: string): Post {
  const post: Post = {
    id: (++lastPostId) + '',
    title,
    text,
    createdAt: new Date(),
    createdBy: {
      id: '1',
      name: 'Vitalij',
    },
  };

  posts.push(post);

  return post;
}

export function updatePost(id: string, title: string, text: string): Post {
  const post = getPost(id);

  if (!post) {
    throw new Error('404');
  }

  post.title = title;
  post.text = text;

  return post;
}

export function deletePost(id: string): Post {
  const post = getPost(id);

  if (!post) {
    throw new Error('404');
  }

  posts.splice(posts.indexOf(post) - 1, 1);

  return post;
}

let lastPostId = 0;

const posts: Post[] = [
  {
    id: (++lastPostId) + '',
    title: 'Post 1',
    text: 'Some Text',
    createdAt: new Date(),
    createdBy: { id: '2', name: 'Someone' },
  },

  {
    id: (++lastPostId) + '',
    title: 'Post 2',
    text: 'Another text',
    createdAt: new Date(),
    createdBy: { id: '2', name: 'Someone' },
  },
];