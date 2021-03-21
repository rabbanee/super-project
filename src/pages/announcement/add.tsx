import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Title from '@elements/Title';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import AddOrEditAnnouncement from '@templates/announcement/AddOrEditAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import Cookies from 'js-cookie';
import axios from 'axios';
import { showAlert } from '@actions/index';
import findGradeByGradeName from '@utils/findGradeByGradeName';

interface AddAnnoncementProps {
  user: User,
  permissions: any,
}

const AddAnnoncement = () => {
  const user = useSelector(state => state.user);
  const token = Cookies.get('token');
  const permissions = useSelector(state => state.permissions);
  const [content, setContent] = useState('');
  const [selectedReader, setSelectedReader] = useState('Seluruh Pengguna');
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>();
  const dispatch: Function = useDispatch();
  const [readers, setReaders] = useState(['Seluruh Pengguna']);
  const [grades, setGrades] = useState([]);
  
  useEffect(() => {
    getGrades();
  }, []);

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
    setGrades(grades);
  };

  const createAnnouncement = async (e: any) => {
    e.preventDefault();
    const reader = selectedReader;
    const selectedGrade = findGradeByGradeName(grades, reader);
    setIsLoading(true);
    let response: any;
    const title = titleInputRef.current.value;
    if (!content.trim()) {
      dispatch(showAlert({
        title: 'Mohon isi kolom kontent',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    }
    const payload = {
      title,
      grade_id: selectedGrade ? selectedGrade.id : null,
      description: content,
    };

    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}announcement`, payload, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error.response);
      dispatch(showAlert({
        title: 'Terjadi kesalahan saat menambah pengumuman',
        type: 'error'
      }));
      setIsLoading(false);
      return error;
    }
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil menambahkan pengumuman',
        type: 'success'
      }));
    }
    console.log('response: ', response);
    setIsLoading(false);
  };

  const onEditorChanges = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    console.log({ event, editor, data })
  };

  return (
    <AddOrEditAnnouncement readers={readers} titleInputRef={titleInputRef} onEditorChanges={onEditorChanges} onSave={createAnnouncement} isLoading={isLoading} selectedReader={selectedReader} setSelectedReader={setSelectedReader} user={user} permissions={permissions.list} />
  );
};

export default WithAuth(AddAnnoncement, 'crud announcement');