import { React, useEffect, useState } from 'react';
import './FichaAssociados.css';
import { useLocation } from 'react-router-dom';
import getAssociateById from '../../components/getAssociateById/getAssociateById';

function FichaAssociados() {
  const { search } = useLocation();
  const associateId = new URLSearchParams(search).get('associateId');
  const [associate, setAssociate] = useState([]);

  useEffect(() => {
    getAssociateById(associateId, setAssociate);
  }, []);

  return (
    <body>
      <table className="tableContainer">
        <div className="gridContainer">
          <table width="100%">
            <tr>
              <td className="tdContainer">
                <table className="tContainer">
                  <table width="100%">
                    <tr>
                      <td>
                        <img src="images/logoFichaAssociados.png" alt="logo" width="75%" />
                      </td>
                      <td>
                        <img src="images/FichaAssociados.png" alt="nome" width="75%" />
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdTitle">
                        DADOS PESSOAIS
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Nome </span>
                        <br />
                        <span>{associate?.name}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Cargo </span>
                        <br />
                        <span>{associate?.office}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> CPF </span>
                        <br />
                        <span>{associate?.cpf}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Usuario </span>
                        <br />
                        <span>{associate?.user}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Nascimento </span>
                        <br />
                        <span>{associate?.birth}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Sexo </span>
                        <br />
                        <span>{associate?.gender}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Naturalidade </span>
                        <br />
                        <span>{associate?.place_of_birth}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Nacionalidade </span>
                        <br />
                        <span>{associate?.nacionality}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Estado Civil </span>
                        <br />
                        <span>{associate?.civil_state}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Conjuge </span>
                        <br />
                        <span>{associate?.spouse}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Nasc do conjuge </span>
                        <br />
                        <span>{associate?.birth_spouse}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Filhos </span>
                        <br />
                        <span>{associate?.sons}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Endereço </span>
                        <br />
                        <span>{associate?.personal_address}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Complemento </span>
                        <br />
                        <span>{associate?.personal_complement}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Número </span>
                        <br />
                        <span>{associate?.personal_number}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Bairro </span>
                        <br />
                        <span>{associate?.personal_district}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Cidade </span>
                        <br />
                        <span>{associate?.personal_city}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Estado </span>
                        <br />
                        <span>{associate?.personal_state}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> CEP </span>
                        <br />
                        <span>{associate?.cep}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdTitle">
                        DADOS FUNCIONAIS
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Lotação </span>
                        <br />
                        <span>{associate?.allocation}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Atuação </span>
                        <br />
                        <span>{associate?.acting}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Endereço </span>
                        <br />
                        <span>{associate?.profissional_address}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Complemento </span>
                        <br />
                        <span>{associate?.profissional_complement}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Número </span>
                        <br />
                        <span>{associate?.profissional_number}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Bairro </span>
                        <br />
                        <span>{associate?.profissional_distric}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Cidade </span>
                        <br />
                        <span>{associate?.profissional_city}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Estado </span>
                        <br />
                        <span>{associate?.profissional_state}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> CEP </span>
                        <br />
                        <span>{associate?.cep}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Telefone </span>
                        <br />
                        <span>{associate?.telephone}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Celular </span>
                        <br />
                        <span>{associate?.cell_phone_number}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Fax </span>
                        <br />
                        <span>{associate?.fax}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdBox">
                        <span className="subtitle"> Email </span>
                        <br />
                        <span>{associate?.email}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Email/Lista </span>
                        <br />
                        <span>{associate?.email_REJUFE}</span>
                      </td>
                      <td className="tdBox">
                        <span className="subtitle"> Email/Ascom </span>
                        <br />
                        <span>{associate?.email_ASCOM}</span>
                      </td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td className="tdTitle" height="25px" />
                    </tr>
                  </table>
                </table>
                <table />
              </td>
            </tr>
          </table>
        </div>
      </table>
    </body>

  );
}

export default FichaAssociados;
