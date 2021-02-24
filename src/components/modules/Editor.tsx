import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import MyUploadAdapter from '@lib/MyUploadAdapter';


const Editor = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    editorLoaded ? (
      <CKEditor
        editor={ClassicEditor}
        data=''
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor)
          editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter(loader);
          };
          // You can store the "editor" and use when it is needed.
        }}
        
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        }}
      />
      ) : (
        <div>Editor loading</div>
      )
  );
};

export default Editor;