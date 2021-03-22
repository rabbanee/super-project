import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import MyUploadAdapter from '@lib/MyUploadAdapter';

type EditorProps = {
  onEditorChanges?: Function,
  data?: string,
}

const Editor = ({ onEditorChanges, data }: EditorProps) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    editorLoaded ? (
      <CKEditor
        editor={ClassicEditor}
        data={data ?? ''}
        onReady={(editor: any) => {
          console.log(editor);
          editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter(loader);
          };
          // You can store the "editor" and use when it is needed.
        }}
        
        onChange={onEditorChanges}
      />
      ) : (
        <div>Editor loading</div>
      )
  );
};

export default Editor;