import { User } from '@interface/User';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import WithAuth from '@lib/WithAuth';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showAlert } from '@actions/index';
import Loading from '@elements/Loading';
import Error from 'next/error';

interface EditNewsProps {
  user: User,
  permissions: any,
}

const EditNews = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const router = useRouter();
  const id: any = router.query.id;
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token');
  const [news, setNews] = useState(null);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const titleInputRef = useRef<HTMLInputElement>();
  const dispatch: Function = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getNewsById(parseInt(id));
  }, []);

  const getNewsById = async (newsId: number) => {
    setIsLoading(true);
    let response: any;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}news/${newsId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      return error;
    }
    if (!response.data.error) {
      setNews(response?.data);
    };
    setIsLoading(false);
  };

  const editNews = async (e: any) => { 
    e.preventDefault();
    const fd = new FormData();
    let response;
    setIsLoading(true);

    if (!content.trim() || !news?.content.trim()) {
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
      response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}news`, fd, {
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

  if (isLoading && news === null) {
    return <Loading />
  }

  if (!isLoading && news === null) {
    return <Error statusCode={404}/>
  }

  return (
    <AddOrEditNews files={files} setFiles={setFiles} user={user} permissions={permissions.list} isLoading={isLoading} onSave={editNews} onEditorChanges={onEditorChanges} titleInputRef={titleInputRef} news={news}/>
  );
};

export default WithAuth(EditNews, 'crud news');