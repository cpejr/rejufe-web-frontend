import { React, useEffect, useState } from 'react';
import './FichaNoticia.css';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import fichaNews from '../../components/NewsQuery/FichaNoticias';
import getNewsById from '../../components/getNewsById/getNewsById';
import * as managerService from '../../services/manager/managerService';

function FichaNoticia() {
  const { search } = useLocation();
  const newsId = new URLSearchParams(search).get('newsId');
  const [news, setNews] = useState([]);
  console.log('🚀 ~ file: FichaNoticia.js ~ line 13 ~ FichaNoticia ~ news', news.photos);
  const [image, setImage] = useState();
  console.log('🚀 ~ file: FichaNoticia.js ~ line 15 ~ FichaNoticia ~ image', image);

  async function getImage(id) {
    try {
      const response = await managerService.getImageById(id);
      setImage(response);
    } catch (error) {
      toast.error('Não foi possível obter imagem', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    getNewsById(newsId, setNews);
  }, []);

  getImage(news?.photos);

  return (
    <body className="forms-minutes-body">
      <div className="forms-minutes-Container">
        <table className="forms-minutes-table-container">
          <div className="forms-minutes-grid-container">
            <table width="100%">
              <tr>
                <td className="forms-minutes-td-container">
                  <table className="forms-minutes-t-container">
                    {fichaNews?.map((ficha) => (
                      <table className="forms-minutes-t-container">
                        <table width="100%">
                          <div className="forms-minutes-title">
                            <td className="forms-minutes-td-title">
                              {ficha.title}
                            </td>
                          </div>
                        </table>
                        {ficha?.lines.map((line) => (
                          <table width="100%">
                            <tr>
                              {line?.items.map((item) => (
                                <div className="forms-minutes-td-box">
                                  {item.label === 'Imagem' ? (
                                    <>
                                      <span className="forms-minutes-subtitle">
                                        {' '}
                                        {item.label}
                                        {' '}
                                      </span>
                                      <br />
                                      <img src={`data:image;base64,${image}`} style={{ width: '250px' }} alt="" />
                                    </>
                                  ) : (
                                    <>
                                      <span className="forms-minutes-subtitle">
                                        {' '}
                                        {item.label}
                                        {' '}
                                      </span>
                                      <br />
                                      <span className="forms-minutes-value">
                                        {' '}
                                        {news[item.id]}
                                        {' '}
                                      </span>

                                    </>
                                  )}
                                </div>
                              ))}
                            </tr>
                          </table>
                        ))}
                      </table>
                    ))}
                    <table width="100%">
                      <tr>
                        <td className="forms-minutes-td-title" height="25px" />
                      </tr>
                    </table>
                  </table>
                  <table />
                </td>
              </tr>
            </table>
          </div>
        </table>
      </div>
    </body>

  );
}

export default FichaNoticia;
