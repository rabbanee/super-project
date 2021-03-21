import { User } from '@interface/User';
import React, { useEffect, useRef, useState } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrEditAnnouncement from '@templates/announcement/AddOrEditAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import usePermissions from '@lib/usePermissions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showAlert } from '@actions/index';
import { useRouter } from 'next/router'
import Loading from '@elements/Loading';
import Error from 'next/error';
import findGradeByGradeName from '@utils/findGradeByGradeName';
import findGradeById from '@utils/findGradeById';

interface EditAnnoncementProps {
  user: User,
  permissions: any,
}


const EditAnnoncement = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [selectedReader, setSelectedReader] = useState('Seluruh Pengguna');  
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>();
  const [content, setContent] = useState('');
  const dispatch: Function = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [readers, setReaders] = useState(['Seluruh Pengguna']);
  const [grades, setGrades] = useState([]);
  const token = Cookies.get('token');
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAnnouncementById(parseInt(id));
  }, []);

  const getAnnouncementById = async (announcementId: number) => {
    setIsLoading(true);
    let response: any;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}announcement/${announcementId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      return error;
    }
    if (!response.data.error) {
      setAnnouncement(response?.data);
    };
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (announcement !== null) {
      selectedReaderHandler();
    };
  }, [announcement?.grade_id]);

  const selectedReaderHandler = async () => {
    let list;
    if (grades?.length === 0) {
      list = await getGrades();
    }
    const selectedGrade = findGradeById(list, announcement.grade_id);
    if (selectedGrade) {
      setSelectedReader(selectedGrade.name);
    };
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
      console.log(error);
      return error;
    }
    let grades = response.data;
    let gradeNames: Array<string> = [];
    (grades).forEach(item => {
      gradeNames.push(item.name);
    });
    setReaders((readers) => [
      ...readers,
      ...gradeNames
    ]);
    await setGrades(grades);
    return grades;
  };

  
  const onEditorChanges = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    console.log({ event, editor, data })
  };

  const editAnnouncement = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const reader = selectedReader;
    const selectedGrade = findGradeByGradeName(grades, reader);
    let response: any;
    let description;
    const title = titleInputRef.current.value;
    if (!content.trim() && announcement.description.trim()) {
      description = announcement.description;
    }
    if (content.trim()) description = content;
    if (!content.trim() && !announcement.description.trim()) {
      dispatch(showAlert({
        title: 'Mohon isi kolom kontent',
        type: 'error'
      }));
    }

    let payload: any = {
      title,
      grade_id: selectedGrade ? selectedGrade.id : null,
      description,
    };

    try {
      response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}announcement/${id}`, payload, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error.response);
      dispatch(showAlert({
        title: 'Terjadi kesalahan saat mengubah pengumuman',
        type: 'error'
      }));
      setIsLoading(false);
      return error;
    }
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil mengubah pengumuman',
        type: 'success'
      }));
    }
    setIsLoading(false);
  };

  if (isLoading && announcement === null) {
    return <Loading />
  }

  if (!isLoading && announcement === null) {
    return <Error statusCode={404}/>
  }

  return (
    <AddOrEditAnnouncement readers={readers} titleInputRef={titleInputRef} onEditorChanges={onEditorChanges} onSave={editAnnouncement} isLoading={isLoading} setSelectedReader={setSelectedReader} selectedReader={selectedReader} user={user} announcement={announcement} permissions={permissions.list} />
  );
};

export default WithAuth(EditAnnoncement,'crud announcement');