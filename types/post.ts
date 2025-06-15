// types/post.ts
export interface Author {
  _id: string;
  username: string;
  phoneNumber: string;
}

export interface Comment {
  _id: string;
  text: string;
  timestamp: string | Date;
  user: {
    _id: string;
    username: string;
    phoneNumber: string;
  };
}


export interface Post {
  _id: string;
  content: string;
  author: Author;
  likes: string[];
  savedBy: string[];
  comments: Comment[];
  createdAt: string;
}
