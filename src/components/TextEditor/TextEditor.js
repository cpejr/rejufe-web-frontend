import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function TextEditor({
  id, setDados, dados, register,
}) {
  const [convertedText, setConvertedText] = useState(register ? 'Escreva a descrição aqui' : dados.description);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ size: ['small', false, 'large', 'huge'] }, { color: [] }, { background: [] }, { font: [] }],
      ['link'],
      ['clean'],
    ],
  };

  const handleChange = (value) => {
    setDados(value, id);
  };

  useEffect(() => {
    if (!convertedText) {
      setConvertedText(dados?.description);
    }
  }, [dados]);

  useEffect(() => {
    handleChange(convertedText);
  }, [convertedText]);

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'header',
    'list',
    'align',
    'script',
    'size',
    'color',
    'background',
    'font',
    'code',
    'link',
    'clean',
  ];

  return (
    <div>
      {convertedText && (
        <ReactQuill
          theme="snow"
          value={convertedText}
          onChange={setConvertedText}
          placeholder="Escreva a descrição aqui!"
          modules={modules}
          formats={formats}
        />
      )}
    </div>
  );
}
