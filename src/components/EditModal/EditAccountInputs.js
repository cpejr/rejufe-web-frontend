import React from 'react';
import moment from 'moment';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';
import './EditModalInputs.css';

function EditModelInputs({
  dados, setDados, archive1Id, titles, select,
}) {
  dados.date = moment(dados.date).format('YYYY-MM-DD');
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  const inputDados = Object.values(dados);
  return (
    <div className="EditModal-inputs">
      {titles.map((title, index) => (
        <>
          {title?.field === 'input' && (
            <div className="EditModal-model-field">
              <div className="EditModal-model-text">
                {title?.label}
              </div>
              <input className="EditModal-model-input" placeholder="" require value={inputDados[index]} onChange={(e) => handleChange(e.target.value, Object.keys(dados)[index])} />
            </div>
          )}
          {title?.field === 'date' && (
            <div className="EditModal-model-field">
              <div className="EditModal-model-text">
                {title?.label}
              </div>
              <input type="date" className="EditModal-model-input" placeholder="" require value={inputDados[index]} onChange={(e) => handleChange(e.target.value, Object.keys(dados)[index])} />
            </div>
          )}
          {title?.field === 'select' && (
            <div className="EditModal-model-field">
              <div className="EditModal-model-text">
                {title?.label}
              </div>
              <select className="EditModal-model-select" placeholder="" require value={inputDados[index][1]} onChange={(e) => handleChange(e.target.value, Object.keys(dados)[index])}>
                {select?.map((selected) => (
                  <option value={selected}>{selected}</option>
                ))}
              </select>
            </div>
          )}
        </>
      ))}
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Anexo:
        </div>
        <SingleFileUpload
          field="archive_1"
          fileType=".pdf"
          file={dados.archive_1}
          dados={dados}
          archiveId={archive1Id}
          setDados={(value, field) => handleChange(value, field)}
          label="Arquivo"
          update
        />
      </div>
    </div>
  );
}

export default EditModelInputs;
