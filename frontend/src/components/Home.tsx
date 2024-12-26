import React, { useState } from 'react';
import Header from './Header';
import PostList from './PostList';
import Filters from './Filters';
import Pagination from './Pagination';
import usePosts from '../hooks/usePosts';
import useDebounce from '../hooks/useDebounce';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const postsPerPage = 10;
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { posts, totalPages, isLoading, error, fetchPosts } = usePosts(
    currentPage,
    postsPerPage,
    order,
    debouncedSearchQuery,
    fromDate,
    toDate
  );

  const { isAuthenticated } = useAuth();  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortOption: string) => {
    setOrder(sortOption);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
    setCurrentPage(1);
  };

  const refreshPostList = () => {
    console.log('Refreshing post list...');
    fetchPosts();
  };

  return (
    <div>
      <Header />
      <main>
        <div className="filters-container">
          <Filters
            onSearch={handleSearchChange}
            onSort={handleSortChange}
            onDateFilter={handleDateFilterChange}
          />
          {isAuthenticated && (
            <button onClick={() => navigate('/posts/add')} className="primary-button add-post-button">
              Add Post
            </button>
          )}
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <PostList posts={posts} searchQuery={debouncedSearchQuery} refreshPostList={refreshPostList} />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default Home;
