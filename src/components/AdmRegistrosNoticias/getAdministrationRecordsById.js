import moment from 'moment';
import * as managerService from '../../services/manager/managerService';

async function getAdministrationRecordsById(newsId, setNews) {
  try {
    const response = await managerService.getNews(newsId);
    const news = {
      status: response.status,
      title: response.title,
      date: moment(response.date).format('DD/MM/YYYY'),
      section: response.section,
      type: response.type,
      description: response.description,
      archive_1: response.archive_1,
      archive_2: response.archive_2,
      photos: response.photos,
      send_site: response.send_site,
    };
    setNews(news);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error); // TO DO: Substitute for redirect to not Found when done
  }
}

export default getAdministrationRecordsById;
