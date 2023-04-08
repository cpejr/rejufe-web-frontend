import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function TextEditor({
  id, setDados, dados,
}) {
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
  const handleChange = (html) => setDados(html, id);

  return (
    <div>
      <ReactQuill
        theme="snow"
        defaultValue={dados.description || ''}
        onChange={handleChange}
        placeholder="Escreva a descrição aqui!"
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
