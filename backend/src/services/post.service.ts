import { Post, IPost } from '../models/post.model';

class PostService {

  async searchPosts(
    searchTerm: string,
    from: Date | null,
    to: Date | null,
    page: number,
    limit: number,
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ posts: IPost[]; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const dateFilter: { pubDate?: any } = {};
      if (from) {
        dateFilter.pubDate = { ...dateFilter.pubDate, $gte: from }; 
      }
      if (to) {
        dateFilter.pubDate = { ...dateFilter.pubDate, $lte: to }; 
      }

      const query = {
        $and: [
          dateFilter,
          {
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } }, 
              { description: { $regex: searchTerm, $options: 'i' } }, 
            ],
          },
        ],
      };

      const totalPosts = await Post.countDocuments(query);

      const totalPages = Math.max(1, Math.ceil(totalPosts / limit));

      const sortOrder = order === 'asc' ? 1 : -1;

      const posts = await Post.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ pubDate: sortOrder }); 

      return { posts, totalPages };
    } catch (error) {
      console.error('Error searching posts:', error);
      throw new Error('Failed to search posts');
    }
  }
  
  async getAllPosts(): Promise<IPost[]> {
    return await Post.find();
  }

  async getPostById(id: string): Promise<IPost | null> {
    return await Post.findOne({ id });
  }

  async createPost(data: Partial<IPost>): Promise<IPost> {
    try{
      const newPost = new Post(data);
      return await newPost.save();
    }catch(error){
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  async updatePost(id: string, data: Partial<IPost>): Promise<IPost | null> {
    return await Post.findOneAndUpdate({ id }, data, {
      new: true,
      runValidators: true,
    });
  }

  async deletePost(id: string): Promise<IPost | null> {
    return await Post.findOneAndDelete({ id });
  }
}

export default new PostService();
