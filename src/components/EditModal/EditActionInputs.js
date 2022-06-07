import React, { useEffect, useState } from 'react';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';
import './EditModalInputs.css';

function EditActionInputs({
  id, dados, setDados, archive1Id, archive2Id, titles, select,
}) {
  console.log('🚀 ~ file: EditActionInputs.js ~ line 8 ~ dados', dados);
  const [inputDados, setInputDados] = useState(Object.entries(dados));

  console.log(inputDados);
  function handleChange(value, field) {
    console.log(field);
    setDados({ ...dados, [field]: value });
  }

  useEffect(() => {
    setInputDados(Object.entries(dados));
  }, [dados]);

  return (
    <div className="EditModal-inputs">
      {titles.map((title, index) => (
        <>
          {title?.field === 'input' && (
            <div className="EditModal-model-field">
              <div className="EditModal-model-text">
                {title?.label}
              </div>
              <input className="EditModal-model-input" placeholder="" require value={inputDados[index][1]} onChange={(e) => handleChange(e.target.value, Object.keys(dados)[index])} />
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
          Arquivo1:
        </div>
        <SingleFileUpload modelId={id} field="archive_1" fileType=".pdf" file={dados.archive_1} dados={dados} archiveId={archive1Id} setDados={(value, field) => handleChange(value, field)} label="Arquivo" update />
      </div>
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Arquivo2:
        </div>
        <SingleFileUpload modelId={id} field="archive_2" fileType=".pdf" file={dados.archive_2} dados={dados} archiveId={archive2Id} setDados={(value, field) => handleChange(value, field)} label="Arquivo" update />
      </div>
    </div>
  );
}

export default EditActionInputs;
