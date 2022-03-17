/* eslint-disable no-nested-ternary */
import * as managerService from '../../services/manager/managerService';

function createData(status, title, date, section, type) {
  return {
    status, title, date, section, type,
  };
}

async function getAllAdministrationRecords(setId, setAllAdministrationRecords) {
  const auxNews = [];
  const newsId = [];
  try {
    const allNews = await managerService.getNews();
    allNews.sort();

    allNews.filter((user) => user.type.toLowerCase() !== 'administrador').forEach((object) => {
      newsId.push(object._id);
      auxNews.push(createData(
        object.status,
        object.title,
        object.date,
        object.section,
        object.type,
      ));
    });

    setId(newsId);
    setAllAdministrationRecords(auxNews);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllAdministrationRecords;
