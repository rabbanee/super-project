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
import Id from 'pages/exams/result/[id]';

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
      setContent(response.data.content);
      setNews(response?.data);
    };
    setIsLoading(false);
  };

  const editNews = async (e: any) => { 
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

    if (files.length > 0) {
      fd.append('thumbnail', files[0]);
    }
    fd.append('title', titleInputRef.current.value.trim() ? titleInputRef.current.value : news.title);
    fd.append('content', content.trim() ? content.trim() : news.content);
    fd.append('_method', 'put');

    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}news/${id}`, fd, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      dispatch(showAlert({
        title: 'Gagal mengedit berita!',
        type: 'error'
      }));
      console.log(error.response);
      return error;
    }
    setIsLoading(false);
    dispatch(showAlert({
      title: 'Berhasil mengedit berita!',
      type: 'success'
    }));
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