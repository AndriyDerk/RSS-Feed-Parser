import React from 'react';

interface PostItemProps {
  post: {
    id: string;
    title: string;
    link: string;
    description: string;
    pubDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="bg-[#243447] p-4 rounded-lg transition-transform transform hover:scale-105">
      <h2 className="text-red-500 text-lg">{post.title}</h2>
      <p className="text-[#9aa2ab]">{post.description}</p>
      <a href={post.link} className="text-blue-400 underline">
        Read more
      </a>
    </div>
  );
};

export default PostItem;
