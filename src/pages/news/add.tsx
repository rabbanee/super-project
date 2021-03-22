import { User } from '@interface/User';
import React, { useRef, useState } from 'react';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import WithAuth from '@lib/WithAuth';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showAlert } from '@actions/index';

interface AddNewsProps {
  user: User,
  permissions: any,
}

const AddNews = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>();
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const token = Cookies.get('token');
  const dispatch: Function = useDispatch();
  
  const addNews = async (e: any) => { 
    e.preventDefault();
    const fd = new FormData();
    let response;
    setIsLoading(true);

    if (!content.trim()) {
      dispatch(showAlert({
        title: 'Kolom konten harus diisi!',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    }

    if (files.length == 0) {
      dispatch(showAlert({
        title: 'Kolom thumbnail harus diisi!',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    }

    fd.append('thumbnail', files[0]);
    fd.append('title', titleInputRef.current.value);
    fd.append('content', content);

    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}news`, fd, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    console.log(response);
    setIsLoading(false);
    dispatch(showAlert({
      title: 'Berhasil menambahkan berita!',
      type: 'success'
    }));
    // console.log(files);
  };

  const onEditorChanges = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    console.log('hola editor: ', data);
  };

  return (
    <AddOrEditNews files={files} setFiles={setFiles} user={user} permissions={permissions.list} isLoading={isLoading} onSave={addNews} onEditorChanges={onEditorChanges} titleInputRef={titleInputRef}/>
  );
};

export default WithAuth(AddNews, 'crud news');