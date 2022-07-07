import { useHistory } from 'react-router-dom';
import moment from 'moment';
import * as managerService from '../../services/manager/managerService';

const routingFunction = (param) => {
  const history = useHistory();

  history.push({
    pathname: '/NotFound',
    state: param,
  });
};

async function getNewsById(newsId, setNews) {
  try {
    managerService.getNewsById(newsId).then((New) => {
      Promise.all([
        managerService.getFileNameById(New.archive_1),
        managerService.getFileNameById(New.archive_2),
      ]).then((response) => {
        const news = {
          date: moment(New.date).format('DD-MM-YYYY'),
          section: New.section,
          type: New.type,
          title: New.title,
          description: New.description,
          archive_1: response[0],
          archive_2: response[1],
          photos: New.photos,
        };
        setNews(news);
      });
    });
  } catch (error) {
    routingFunction();
  }
}

export default getNewsById;
