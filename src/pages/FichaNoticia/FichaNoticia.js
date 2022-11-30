/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import React, {
  useRef, useState, useEffect,
} from 'react';
import './FichaNoticia.css';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ReactHtmlParser from 'react-html-parser';
import fichaNews from '../../components/NewsQuery/FichaNoticias';
import getNewsById from '../../components/getNewsById/getNewsById';
import * as managerService from '../../services/manager/managerService';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const { news } = this.props;
    const { Example } = this.props;
    const { image } = this.props;

    return (
      <div>
        <table className="forms-news-table-container">
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
                                <div>
                                  {item.label === 'Imagem' ? (
                                    <div>
                                      <div>
                                        <span className="forms-news-subtitle-img">
                                          {' '}
                                          {item.label}
                                          {' '}
                                        </span>
                                      </div>
                                      <div className="forms-news-td-box-img">
                                        <div className="forms-news-img">
                                          {image && Example()}
                                        </div>
                                        <br />
                                      </div>
                                    </div>
                                  ) : item.label === 'Descrição' ? (
                                    <div>
                                      <span className="forms-news-subtitle-img">
                                        {' '}
                                        {item.label}
                                        {' '}
                                      </span>
                                      <span className="forms-news-value-description">
                                        {' '}
                                        { ReactHtmlParser(news?.description)}
                                        {' '}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="forms-news-td-box">
                                      <span className="forms-news-subtitle">
                                        {' '}
                                        {item.label}
                                        {' '}
                                      </span>
                                      <br />
                                      <span className="forms-news-value">
                                        {' '}
                                        {news[item.id]}
                                        {' '}
                                      </span>
                                    </div>
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
    );
  }
}

function FichaNoticia() {
  const { search } = useLocation();
  const newsId = new URLSearchParams(search).get('newsId');
  const [news, setNews] = useState([]);
  const [image, setImage] = useState(news?.photos);

  // eslint-disable-next-line react/no-unstable-nested-components
  function Example() { return image ? <img src={`data:image/jpeg;base64,${image}`} alt="" /> : null; }

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

  useEffect(() => {
    if (news?.photos) {
      getImage(news?.photos);
    }
  }, [news]);

  const handleWindowClose = () => {
    window.close('/imprimir');
  };

  const tableNews = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tableNews?.current,
  });

  return (
    <body className="forms-minutes-body">
      <div className="forms-minutes-Container">
        {newsId ? (
          <div className="header-print-associates-icon">
            <button
              type="button"
              className="print-associates-button"
              onClick={handlePrint}
            >
              <PrintRoundedIcon sx={{ fontSize: 20, marginRight: 1 }} />
              Imprimir
            </button>
            <button
              type="button"
              className="return-print-associates-button"
              onClick={handleWindowClose}
            >
              <BackspaceIcon sx={{ fontSize: 20, marginRight: 1 }} />
              Fechar
            </button>
          </div>
        ) : (
          <div className="header-print-minutes-icon">
            <button
              type="button"
              className="print-minutes-button"
              onClick={handlePrint}
            >
              <PrintRoundedIcon sx={{ fontSize: 20, marginRight: 1 }} />
              Imprimir
            </button>
            <button
              type="button"
              className="return-print-minutes-button"
              onClick={handleWindowClose}
            >
              <BackspaceIcon sx={{ fontSize: 20, marginRight: 1 }} />
              Fechar
            </button>
          </div>
        )}
        <div className="print-associates-table">
          <ComponentToPrint news={news} ref={tableNews} Example={Example} image={image} />
        </div>
      </div>
    </body>

  );
}

export default FichaNoticia;
