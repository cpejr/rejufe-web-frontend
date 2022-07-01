import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './NewsQuery.css';

function MinuteQuery() {
  const [news, setAllNews] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const titles = [
    '',
    'Título',
  ];

  function createData(title) {
    return {
      title,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllNews() {
    const auxNew = [];
    const newId = [];

    try {
      const allNews = await managerService.getNews();
      allNews.forEach((object) => {
        auxNew.push(createData(
          object.title,
        ));
      });
      allNews.forEach((object) => {
        newId.push(createId(
          object._id,
        ));
      });
      auxNew.sort();
      setId(newId);
      setAllNews(auxNew);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast.error('Não foi possível obter ações administrativas!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    getAllNews();
  }, [use]);

  return (
    <div>
      <div className="intranet-home-menu">
        <h1>
          {'Notícias '}
        </h1>
      </div>
      <div className="line-table-intranet-home-adm-menu" />
      <TableComponent
        setUse={setUse}
        id={id}
        rows={news}
        titles={titles}
        search
      />
    </div>
  );
}

export default MinuteQuery;
