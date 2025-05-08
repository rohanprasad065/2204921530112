export interface User {
    id: string;
    name: string;
    postCount: number;
  }
  
  export interface Post {
    id: number;
    userId: string;
    userName: string;
    content: string;
    commentCount?: number;
    timestamp?: number;
  }
  