import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

interface Post {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string; 
  createdAt: string;
  updatedAt: string;
}

interface PostListProps {
  posts: Post[];
  searchQuery: string; 
  refreshPostList: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, searchQuery, refreshPostList }) => {
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const handleDeletePost = async (id: string) => {
    try {
      const response = await api.delete(`/posts/${id}`); 

      if (response.status === 200 || response.status === 204) {
        alert('Post deleted successfully');
        setDeletePostId(null); 
        refreshPostList();
      } else {
        throw new Error('Unexpected server response'); 
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      const errorMessage =
        (error as any).response?.data?.message || 'Failed to delete post'; 
      alert(errorMessage);
      setDeletePostId(null); 
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi');

    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: '#918d3c' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const formatAndHighlightDate = (dateString: string, query: string) => {
    const formattedDate = new Date(dateString).toLocaleString();
    return highlightText(formattedDate, query);
  };

  return (
    <main>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{highlightText(post.title, searchQuery)}</h2>
          <p>{highlightText(post.description, searchQuery)}</p>
          <div className='post-footer'>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
            {isAuthenticated && ( 
              <div className="post-actions">
                <button
                  className="secondary-button"
                  onClick={() => navigate(`/posts/edit/${post.id}`)}
                >
                  Edit
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setDeletePostId(post.id)}
                >
                  Delete
                </button>
              </div>
            )}
            <div className="post-dates">
              <p>
                Published: {formatAndHighlightDate(post.pubDate, searchQuery)}
              </p>
              <p>
                Updated: {formatAndHighlightDate(post.updatedAt, searchQuery)}
              </p>
            </div>
            
          </div>
        </div>
      ))}
      {deletePostId && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this post?</p>
            <button
              onClick={() => handleDeletePost(deletePostId)}
              className="primary-button"
            >
              Yes
            </button>
            <button
              onClick={() => setDeletePostId(null)}
              className="secondary-button"
            >
              No
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostList;

