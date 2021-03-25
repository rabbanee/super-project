import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showAlert } from '@actions/index';

function AddLearningMaterials() {   
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const token = Cookies.get('token');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(null)
  const titleRef = useRef<HTMLInputElement>();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const dispatch: Function = useDispatch();
  
  useEffect(() => {
    getGrades();
    getSubjects();
    getChapters();
  }, []);

  const getSubjects = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}subjects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    return {
      options: response.data.data,
      hasMore: response.data.next_page_url !== null,
    }
  };

  const getChapters = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}chapter`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    return {
      options: response.data.data,
      hasMore: response.data.next_page_url !== null,
    }
  };

  const getGrades = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}grades`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    return {
      options: response.data,
      hasMore: false,
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let response: any;
    if (!selectedSubject || !selectedGrade || !selectedChapter || !content.trim() || !titleRef.current.value.trim()) {
      dispatch(showAlert({
        title: 'Mohon isi kolom yang tersedia',
        type: 'error'
      }));
      return;
    } 
    
    let payload = {
      title: titleRef.current.value.trim(),
      subject_id: selectedSubject.id,
      grade_id: selectedGrade.id,
      chapter_id: selectedChapter.id,
      content,
    };
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}learning-materials`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
      return error;
    }
    console.log(response);
    dispatch(showAlert({
      title: 'Berhasil menambahkan materi pembelajaran',
      type: 'success'
    }));
    setIsLoading(false);
  };
  
  const onEditorChanges = (event, editor) => {
    const data = editor.getData();
    setContent(data.trim());
    console.log({ event, editor, data })
  };

  return(
    <AddOrUpdateLearningMaterials onEditorChanges={onEditorChanges} isLoading={isLoading} titleRef={titleRef} selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} getGrades={getGrades} selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter} getChapters={getChapters} onSubmit={onSubmit} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} getSubjects={getSubjects} title="Tambah Materi Pembelajaran" user={user} permissions={permissions.list}/>
  );
};

export default WithAuth(AddLearningMaterials, 'crud learning materials');
