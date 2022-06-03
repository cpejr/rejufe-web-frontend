import moment from 'moment';
import * as managerService from '../../services/manager/managerService';

function createData(status, title, date, section, type) {
  return {
    status, title, date, section, type,
  };
}

<<<<<<< HEAD
async function getAllAdministrationRecords(setId, setAllAdministrationRecords, setSequentialId, history) {
=======
async function getAllAdministrationRecords(
  setId,
  setAllAdministrationRecords,
  setNewsSequentialId,
  history,
  setLoading,
) {
  setLoading(true);
>>>>>>> DEV
  const auxNews = [];
  const newsId = [];
  const newsCode = [];

  try {
    const allNews = await managerService.getNews();
    allNews.sort();

    allNews.filter((user) => user.type.toLowerCase() !== 'administrador').forEach((object) => {
      newsId.push(object._id);
      newsCode.push(object.news_sequential_id);
      auxNews.push(createData(
        object.status,
        object.title,
        moment(object.date).format('DD/MM/YYYY'),
        object.section,
        object.type,
      ));
    });

    setId(newsId);
    setAllAdministrationRecords(auxNews);
    setNewsSequentialId(newsCode);
    setLoading(false);
  } catch (error) {
    history.push('/NotFound');
    setLoading(false);
  }
}

export default getAllAdministrationRecords;
