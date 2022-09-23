import React from 'react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const CustomButton = () => "Button";

function insertButton() {
    const cursorPosition = this.quill.getSelection() ? this.quill.getSelection().index : 0;
    this.quill.insertText(cursorPosition, "button", "link", "#");
    this.quill.setSelection(cursorPosition + 6);
}

const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option value="1" />
        <option value="2" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
      <button className="ql-insertButton">
        <CustomButton />
      </button>
    </div>
  );


const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertButton: insertButton
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };
  
  
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];
  
  const ArticleEditor = ({
    value,
    setValue
  }) => {
    return (<>
          <CustomToolbar />
          <ReactQuill
            onChange={setValue}
            value={value}
            modules={modules}
            formats={formats}
            theme={"snow"} />
       </>);
  }
  
  export default ArticleEditor
  