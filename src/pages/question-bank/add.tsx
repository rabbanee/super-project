import dummySubjects from '@data/dummies/subjects';
import grades from '@data/grades';
import options from '@data/options';
import typeOfQuestions from '@data/type-of-questions';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import ListBox from '@modules/ListBox';
import { thisPageFor } from '@utils/thisPageFor';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import * as Button from '@elements/Button';
import ContainerFooter from '@elements/container/Footer';
import Link from 'next/link';
import * as OutlineIcon from '@elements/icon/Outline';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showAlert } from '@actions/index';

interface AddQuestionsProps {
  user: User,
  permissions: any,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)

const AddQuestions = () => {
  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState(typeOfQuestions[0]);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(options[0]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [content, setContent] = useState('');
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const token = Cookies.get('token');
  const dispatch: Function = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>();
  
  useEffect(() => {
    getGrades();
    getSubjects();
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
      return error;
    }
    if (response.data.length > 0) {
      setSelectedGrade(response.data[0]);
    }
    return {
      options: response.data,
      hasMore: false,
    }
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
    if (response?.data?.length > 0) {
      setSelectedSubject(response?.data?.data[0]);
    }
    return {
      options: response.data.data,
      hasMore: response.data.next_page_url !== null,
    }
  };

  const addQuestion = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const selectedGradeId = selectedGrade?.id;
    let options = [];
    const selectedSubjectId = selectedSubject?.id;
    let response: any;
    
    if (!content.trim()) {
      dispatch(showAlert({
        title: 'Mohon isi kolom soal',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    } 
    if (!selectedGradeId) {
      dispatch(showAlert({
        title: 'Mohon isi kolom kelas',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    } 
    if (!selectedSubjectId) {
      dispatch(showAlert({
        title: 'Mohon isi kolom pelajaran',
        type: 'error'
      }));
      setIsLoading(false);
      return;
    } 

    if (selectedTypeOfQuestion === 'Esai') {
      if (!formRef.current['essay_correct_answer'].value.trim()) {
        dispatch(showAlert({
          title: 'Mohon isi kolom jawaban benar esai',
          type: 'error'
        }));
        setIsLoading(false);
        return;
      } 
    } else {
      const aOption = formRef.current['option_a']?.value;
      const bOption = formRef.current['option_b']?.value;
      const cOption = formRef.current['option_c']?.value;
      const dOption = formRef.current['option_d']?.value;
      if (!aOption.trim() || !bOption.trim() || !cOption.trim() || !dOption.trim()) {
        dispatch(showAlert({
          title: 'Mohon isi kolom opsi',
          type: 'error'
        }));
        setIsLoading(false);
        return;
      }

      options = [
        {
          name: 'a',
          content: formRef.current['option_a']?.value,
          is_true: selectedCorrectAnswer.toLowerCase() === 'a'
        },
        {
          name: 'b',
          content: formRef.current['option_b']?.value,
          is_true: selectedCorrectAnswer.toLowerCase() === 'b'
        },
        {
          name: 'c',
          content: formRef.current['option_c']?.value,
          is_true: selectedCorrectAnswer.toLowerCase() === 'c'
        },
        {
          name: 'd',
          content: formRef.current['option_d']?.value,
          is_true: selectedCorrectAnswer.toLowerCase() === 'd'
        },
      ];
      
      // console.log('selectedCorrectAnswer: ', selectedCorrectAnswer.toLowerCase());
    }

    let payload = {
      content,
      grade_id: selectedGradeId.toString(),
      subject_id: selectedSubjectId.toString(),
      essay_answer: formRef.current['essay_correct_answer']?.value,
      type: selectedTypeOfQuestion === 'Esai' ? 'Essay': 'Multiple Choice',
      options,
    };

    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}question`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error.response);
      dispatch(showAlert({
        title: 'Terjadi kesalahan',
        type: 'error'
      }));
      setIsLoading(false);
      return error;
    }
    dispatch(showAlert({
      title: 'Berhasil menambah soal',
      type: 'success'
    }));
    setIsLoading(false);
  }

  
  const onEditorChanges = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    // console.log({ event, editor, data })
  };

  return (
    <LayoutWithSidebar user={user} title="Tambah Soal" permissions={permissions.list}>
      <Container>
        <form onSubmit={addQuestion} ref={formRef}>
          <ContainerBody>
            <div className="flex justify-between flex-wrap">
              <h2 className="text-3xl font-bold	text-black mb-2">Tambah Soal</h2>
              <Link href="/question-bank">
                <a className="bg-white hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-gray-300 py-2 px-4 text-sm font-medium rounded-md focus:outline-none inline-flex items-center cursor-pointer">
                  <OutlineIcon.ArrowLeft className="-ml-1 mr-1 h-5 w-5" />
                  Kembali
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="col-span-2">
                <label className="block text-md font-medium text-gray-700">Soal</label>
                <Editor onEditorChanges={onEditorChanges} data={content}/>
              </div>
              <div className="col-span-2">
                <ListBox items={typeOfQuestions} label="Tipe Soal" selectedItem={selectedTypeOfQuestion} setSelectedItem={setSelectedTypeOfQuestion}/>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <div className={`grid ${selectedTypeOfQuestion === 'Pilihan Ganda' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-6`}>
                  {
                    selectedTypeOfQuestion === 'Pilihan Ganda' &&  <ListBox items={options} label="Jawaban Benar" selectedItem={selectedCorrectAnswer} setSelectedItem={setSelectedCorrectAnswer}/>
                  }
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Kelas</label>
                    <AsyncPaginate
                      key={''}
                      value={selectedGrade || ''}
                      loadOptions={getGrades}
                      getOptionValue={(option) => option.name}
                      getOptionLabel={(option) => option.name}
                      onChange={(item) => setSelectedGrade(item)}
                      isSearchable={false}
                      placeholder="Kelas"
                      additional={{
                        page: 1,
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Pelajaran</label>
                    <AsyncPaginate
                      key={''}
                      value={selectedSubject || ''}
                      loadOptions={getSubjects}
                      getOptionValue={(option) => option.name}
                      getOptionLabel={(option) => option.name}
                      onChange={(item) => setSelectedSubject(item)}
                      isSearchable={false}
                      placeholder="Pelajaran"
                      additional={{
                        page: 1,
                      }}
                    />
                  </div>
                  {/* <ListBox items={grades} label="Kelas" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/> */}
                  {/* <ListBox items={dummySubjects} label="Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject} /> */}
                </div>
              </div>
              {
                selectedTypeOfQuestion === 'Pilihan Ganda' ? 
                // Option for Multiple Choice
                (
                  <>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_a" className="block text-md font-medium text-gray-700">Opsi A</label>
                      <textarea name="option_a" id="option_a" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_b" className="block text-md font-medium text-gray-700">Opsi B</label>
                      <textarea name="option_b" id="option_b" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_c" className="block text-md font-medium text-gray-700">Opsi C</label>
                      <textarea name="option_c" id="option_c" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_d" className="block text-md font-medium text-gray-700">Opsi D</label>
                      <textarea name="option_d" id="option_d" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                  </>
                ) :
                //  a input for essay answer
                <div className="col-span-2 sm:col-span-2">
                  <label htmlFor="essay_correct_answer" className="block text-md font-medium text-gray-700">Jawaban Benar</label>
                  <textarea name="essay_correct_answer" id="essay_correct_answer" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                  </textarea>
                </div>
              }
             
            </div>
          </ContainerBody>
          <ContainerFooter className="flex justify-end">
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'} group relative flex justify-center`}
              disabled={isLoading}
            >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                }
                {
                  isLoading ? 'Memproses' : 'Simpan'
                }
            </Button.Primary>
          </ContainerFooter>
        </form>
      </Container>
    </LayoutWithSidebar>
  );
};

export default WithAuth(AddQuestions, 'crud question bank');
