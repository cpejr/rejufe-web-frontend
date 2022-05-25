import React from 'react';
import SingleFileUpload from '../../SingleFileUpload/SingleFileUpload';

function EditModelInputs({
  id, dados, setDados, archive1Id, archive2Id,
}) {
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  return (
    <div className="EditModal-inputs">
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Número:
        </div>
        <input className="EditModal-model-input" placeholder="" require value={dados?.numberModels} onChange={(e) => handleChange(e.target.value, 'numberModels')} />
      </div>
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Descrição:
        </div>
        <input className="EditModal-model-input" placeholder="" require value={dados?.description} onChange={(e) => handleChange(e.target.value, 'description')} />
      </div>
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Tipo:
        </div>
        <select className="EditModal-model-select" placeholder="" require value={dados?.type} onChange={handleChange}>
          <option value="REQUERIMENTOS ADMINISTRATIVOS">REQUERIMENTOS ADMINISTRATIVOS</option>
          <option value="PETIÇÕES INICIAIS">PETIÇÕES INICIAIS</option>
          <option value="JURISPRUDÊNCIA">JURISPRUDÊNCIA</option>
        </select>
      </div>
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
