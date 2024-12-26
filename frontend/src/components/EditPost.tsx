import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const EditPost: React.FC = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        const { title, description, link } = response.data;
        setTitle(title);
        setDescription(description);
        setLink(link || '');
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch post details. Please try again.');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !link) {
      setError('Title, Description and Link are required.');
      return;
    }


    try {
      const updatedPost = {
        title,
        description,
        link: link || undefined,
      };

      await api.put(`/posts/${id}`, updatedPost); 
      alert('Post updated successfully');
      navigate('/home');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit} className="form">
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={5}
          ></textarea>

          <input
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input-field"
          />

          <button type="submit" className="primary-button">
            Update Post
          </button>
        </form>

        <button
          onClick={() => navigate('/home')}
          className="secondary-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default EditPost;
