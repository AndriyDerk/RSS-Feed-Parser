import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !link) {
      setError('Title, Description and Link are required.');
      return;
    }

    try {
      const newPost = {
        title,
        description,
        link, 
      };

      await api.post('/posts', newPost); 
      alert('Post added successfully');
      navigate('/home'); 
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Failed to add post. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Post</h2>
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
          Add Post
        </button>
      </form>

      <button
        onClick={() => navigate('/home')}
        className="secondary-button"
      >
        Back to Home
      </button>
    </div>
  );
};

export default AddPost;
