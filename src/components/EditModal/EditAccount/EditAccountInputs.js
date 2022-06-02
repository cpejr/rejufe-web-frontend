import React from 'react';
import moment from 'moment';
import SingleFileUpload from '../../SingleFileUpload/SingleFileUpload';

function EditAccountInputs({
  id, dados, setDados, archive1Id, titles,
}) {
  dados.date = moment(dados.date).format('YYYY-MM-DD');
  function handleChange(value, field) {
    console.log('🚀 ~ file: EditAccountInputs.js ~ line 10 ~ handleChange ~ field', field);
    setDados({ ...dados, [field]: value });
  }

  const inputDados = Object.values(dados);
  console.log('🚀 ~ file: EditAccountInputs.js ~ line 15 ~ inputDados', inputDados);

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
        </>
      ))}
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Anexo:
        </div>
        <SingleFileUpload modelId={id} field="pdf" fileType=".pdf" file={dados.archive1} dados={dados} archiveId={archive1Id} setDados={(value, field) => handleChange(value, field)} label="Arquivo" update />
      </div>
    </div>
  );
}

export default EditAccountInputs;
