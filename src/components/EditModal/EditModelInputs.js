import React from 'react';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

function EditModelInputs({
  id, dados, setDados, archive1Id, archive2Id, titles,
}) {
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
              <input className="EditModal-model-input" placeholder="" require value={inputDados[index]} onChange={(e) => handleChange(e.target.value, `${inputDados[index]}`)} />
            </div>
          )}
          {title?.field === 'select' && (
            <div className="EditModal-model-field">
              <div className="EditModal-model-text">
                {title?.label}
              </div>
              <select className="EditModal-model-select" placeholder="" require value={inputDados[index]} onChange={handleChange}>
                <option value="REQUERIMENTOS ADMINISTRATIVOS">REQUERIMENTOS ADMINISTRATIVOS</option>
                <option value="PETIÇÕES INICIAIS">PETIÇÕES INICIAIS</option>
                <option value="JURISPRUDÊNCIA">JURISPRUDÊNCIA</option>
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

export default EditModelInputs;
