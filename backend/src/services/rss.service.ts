import Parser from 'rss-parser';
import { IPlainPost } from '../models/post.model';
import PostService from './post.service';

class RssService {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  async parsePost(url: string): Promise<IPlainPost[]> {
    try {
      const posts = await this.parser.parseURL(url);
  
      if (!posts.items || posts.items.length === 0) {
        return [];
      }
      
      return posts.items.map(item => ({
        id: item.guid || '',
        title: item.title || '',
        link: item.link || '#',
        description: item.content || item['content:encoded'] || item.contentSnippet || item.description || '',
        pubDate: new Date(item.pubDate || Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    } catch (error) {
      console.error('Error parsing RSS posts:', error);
      return [];
    }
  }
  
  

  async saveParsed(url: string): Promise<void>{
    try {
      const parsedPosts = await this.parsePost(url);

      for (const post of parsedPosts) {
        try{
          const existingPost = await PostService.getPostById(post.id);
          if (!existingPost) {
            const savedPost = await PostService.createPost(post);
          }
        }catch(error){
          console.error(`Error saving post to database on id - ${post?.id} with error:`, error);
        }
      }
    } catch (error) {
      console.error('Error saving posts to database:', error);
    }
  }
}

export default new RssService();
