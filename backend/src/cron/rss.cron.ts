import { CronJob } from 'cron';
import RssService from '../services/rss.service';

const RSSCron = () => {
  const job = new CronJob(
    '0 * * * *', 
    async () => {

      try {
        console.log("Start parsing posts")
        await RssService.saveParsed('https://lifehacker.com/feed/rss');
        console.log("Finish parsing posts")
      } catch (error) {
        console.error('Error fetching RSS feed:');
      }
    },
    null,
    true, 
    'UTC'
  );

  console.log('RSS Cron initialized');
};

export default RSSCron;
