import learningMaterials from '@data/learning-materials';
import { User } from '@interface/User';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import { useRouter } from 'next/router';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '@actions/index';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Loading from '@elements/Loading';
import Error from 'next/error';

function UpdateLearningMaterials() {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get('token');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [grades, setGrades] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [chapters, setChapters] = useState(null);
  const titleRef = useRef<HTMLInputElement>();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const dispatch: Function = useDispatch();
  const [learningMaterial, setLearningMaterial] = useState(null);
  
  useEffect(() => {
    getLearningMaterialById(id);
    getGrades();
    getSubjects();
    getChapters();
  }, []);

  useEffect(() => {
    if (grades !== null && learningMaterial !== null) {
      const selectedGrade = getGradesById(learningMaterial.grade_id);
      setSelectedGrade(selectedGrade);
    }
    if (subjects !== null && learningMaterial !== null) {
      const selectedSubject = getSubjectsById(learningMaterial.subject_id);
      setSelectedSubject(selectedSubject);
    }
    if (chapters !== null && learningMaterial !== null) {
      const selectedChapter = getChaptersById(learningMaterial.chapter_id);
      setSelectedChapter(selectedChapter);
    }
    // console.log(learningMaterial);
  }, [learningMaterial, grades, subjects, chapters]);
  
  const getLearningMaterialById = async (id: any) => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}learning-materials/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      return error;
    }
    let learningMaterial = response.data.learning_material;
    await setLearningMaterial(learningMaterial);
    setIsLoading(false);
  };

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
    setSubjects(response.data.data);
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
    setChapters(response.data.data);
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
    setGrades(response.data);
    return {
      options: response.data,
      hasMore: false,
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let response: any;
    if (!selectedSubject || !selectedGrade || !selectedChapter || (!content.trim() && !learningMaterial.content) || !titleRef.current.value.trim()) {
      dispatch(showAlert({
        title: 'Mohon isi kolom yang tersedia',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    }; 
    
    let payload = {
      title: titleRef.current.value.trim(),
      subject_id: selectedSubject.id,
      grade_id: selectedGrade.id,
      chapter_id: selectedChapter.id,
      content: content || learningMaterial.content,
    };
    try {
      response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}learning-materials/${id}`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      dispatch(showAlert({
        title: 'Terjadi kesalahan saat mengubah materi pembelajaran',
        type: 'error'
      }));
      return error;
    }
    dispatch(showAlert({
      title: 'Berhasil mengubah materi pembelajaran',
      type: 'success'
    }));
    setIsLoading(false);
  };
  
  const getChaptersById = (id) => {
    return chapters?.find((chapter) => chapter.id === id);
  };
  
  
  const getGradesById = (id) => {
    return grades?.find((grade) => grade.id === id);
  };
  
  const getSubjectsById = (id) => {
    return subjects?.find((subject) => subject.id === id);
  };

  const onEditorChanges = (event, editor) => {
    const data = editor.getData();
    setContent(data.trim());
    console.log({ event, editor, data })
  };

  if (isLoading && learningMaterial === null) {
    return <Loading />
  }

  if (!isLoading && learningMaterial === null) {
    return <Error statusCode={404}/>
  }

  return(
   <AddOrUpdateLearningMaterials learningMaterial={learningMaterial} onEditorChanges={onEditorChanges} isLoading={isLoading} titleRef={titleRef} selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} getGrades={getGrades} selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter} getChapters={getChapters} onSubmit={onSubmit} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} getSubjects={getSubjects} title="Ubah Materi Pembelajaran" user={user} permissions={permissions.list}/>
  );
};

export default WithAuth(UpdateLearningMaterials, 'crud learning materials');
