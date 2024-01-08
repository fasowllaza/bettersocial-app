
export type PostDetailProps = {
    postContentData: ContentData;
    handleDownvote: (id: number) => void;
    handleUpvote: (id: number) => void;
    handleAddComment: (id: number, newComment: string) => void;
  };

  export type ContentData = {
    id: number;
    content: string;
    upvotes: number;
    comment: CommentData[];
    didUpvotes: 'downvotes' | 'upvotes' | null;
    postedBy: string;
    date: string
  }

  export type CommentData = {
    content: string;
    createdBy: string;
    date: string;
  }
  