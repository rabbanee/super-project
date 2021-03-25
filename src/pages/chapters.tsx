import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';
import ListBox from '@modules/ListBox';
import InputWithIcon from '@modules/InputWithIcon';
import * as SolidIcon from '@elements/icon/Solid';
import showEntries from '@data/show-entries';
import { useEffect, useRef, useState } from 'react';
import Pagination from '@modules/Pagination';
import * as Button from '@elements/Button';
import Link from 'next/link';
import AddOrEditChapterModal from '@modules/AddOrEditChapterModal';
import dummySubjects from '@data/dummies/subjects';
import dummyChapters from '@data/dummies/chapters';
import ConfirmationModal from '@modules/ConfirmationModal';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import Cookies from 'js-cookie';
import SkeletonTable from '@modules/SkeletonTable';
import { showAlert } from '@actions/index';
import initialDataWithPagination from '@data/initial-data-with-pagination';

interface ChapterProps {
  user: User,
  permissions: any,
}

const Chapters = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [isEditChapterModalShow, setIsEditChapterModalShow] = useState(false);
  const chapterNameRef = useRef<HTMLInputElement>();
  const searchInputRef = useRef<HTMLInputElement>();
  const [chapters, setChapters] = useState(initialDataWithPagination);
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const dispatch: Function = useDispatch();
  const [isLoading, setIsLoading] =  useState(true);
  const [selectedSubject, setSelectedSubject] = useState(dummySubjects[0]);
  const [selectedChapterData, setSelectedChapterData] = useState(null);
  const [isAddChapterModalShow, setIsAddChapterModalShow] = useState(false);
  const token = Cookies.get('token');
  const [subjects, setSubjects] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);

  useEffect(() => {
    getChapters();
    getSubjects();
  },[]);

  const getChapters = async (page = 1) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}chapter?page=${page}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log(error);
      return error;
    }
    setChapters(response.data);
    setIsLoading(false);
  }

  const onCurrentPageChange = ({ currentPage }) => {
    const query = searchInputRef.current.value;
    // console.log(currentPage);
    setIsLoading(true);
    setChapters({
      ...chapters,
      data: [],
    });
    if (!query.trim()) {
      getChapters(currentPage)
      return;
    };
    searchChapterHandler(query, currentPage);
  }

  const editChapterModalHandler = (chapterName: string, subjectName: string) => {
    setIsEditChapterModalShow(true);
    setSelectedChapterData({
      chapterName,
      subjectName
    });
    setSelectedSubject(subjectName);
  }

  const getSubjects = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}subjects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    setSubjects(response.data);
    const subjectNames = (response.data.data).map(subject => subject.name);
    setSubjectNames(subjectNames);
  }

  const editChapterHandler = async (e: any) => {
    e.preventDefault();
    const subjectId = (subjects.find((subject) => subject.name === selectedSubject)).id;
    let response;
    try {
      response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}chapter/${selectedChapterId}`, {
        name: chapterNameRef?.current?.value,
        subject_id: subjectId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(showAlert({
        title: 'Terjadi Kesalahan untuk mengubah Bab',
        type: 'error'
      }));
      return error;
    }
    setIsEditChapterModalShow(false);
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil mengubah Bab',
        type: 'success'
      }));
      getChapters(chapters?.current_page);
    }
  };

  const addChapterHandler = async (e: any) => {
    e.preventDefault();
    const subjectId = (subjects.find((subject) => subject.name === selectedSubject)).id;
    let response;
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}chapter`, {
        name: chapterNameRef.current.value,
        subject_id: subjectId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(showAlert({
        title: 'Terjadi Kesalahan untuk menambah Bab',
        type: 'error'
      }));
      return error;
    }
    setIsAddChapterModalShow(false);
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil menambahkan Bab',
        type: 'success'
      }));
      getChapters(chapters.current_page);
    }
  };

  const deleteChapter = async () => {
    setIsConfirmationModalShow(false);
    let response;
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}chapter/${selectedChapterId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error);
      dispatch(showAlert({
        title: 'Terjadi Kesalahan untuk menghapus Bab',
        type: 'error'
      }));
      return error;
    }
    
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil  menghapus Bab',
        type: 'success'
      }));
      getChapters();
    }
  };

  const searchChapterHandler = async (query: string, page: any) => {
    if (!query.trim()) {
      getChapters();
      return;
    };
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}chapter/search/${query}?page=${page}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log(error);
      return error;
    }
    setChapters(response.data);
    setIsLoading(false);
  };

  return (
    <>
      <AddOrEditChapterModal subjectNames={subjectNames} isModalShow={isAddChapterModalShow} setIsModalShow={setIsAddChapterModalShow} chapterNameRef={chapterNameRef} onSubmit={addChapterHandler} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}  />
      <AddOrEditChapterModal subjectNames={subjectNames}  isModalShow={isEditChapterModalShow} setIsModalShow={setIsEditChapterModalShow} chapterNameRef={chapterNameRef} onSubmit={editChapterHandler} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} chapterData={selectedChapterData} />
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Bab" description="Apakah Anda yakin ingin menghapus? Jika dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={deleteChapter}/>
      <LayoutWithSidebar title="Bab" user={user} permissions={permissions.list}>
        <Container>
          <ContainerBody className="rounded-b-xl space-y-2">
            <div className="flex justify-between items-baseline">
              <h2 className="text-3xl font-bold	text-black mb-2">Bab</h2>
              <Button.Primary type="button" onClick={() => setIsAddChapterModalShow(true)} className="inline-flex items-center">
                <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                Tambah Bab
              </Button.Primary>
            </div>
            <div className="flex justify-end space-y-3">
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />} onChange={(e) => searchChapterHandler((e.target.value).trim(), 1)} searchInputRef={searchInputRef}/>
            </div>
            {
              !isLoading && (
                <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
                  <thead className="bg-primary">
                    <tr>
                      <Th className="text-center">
                        No
                      </Th>
                      <Th className="text-center">
                        Mata Pelajaran
                      </Th>
                      <Th className="text-center">
                        Bab
                      </Th>
                      <Th className="text-center">
                        Aksi
                      </Th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      (chapters?.data).length > 0 && (chapters?.data).map((chapter, chapterIndex) => 
                        <tr key={chapter.id}>
                          <Td className="text-center">
                          { (1 + ((chapters.current_page - 1) * chapters.per_page)) + chapterIndex }
                          </Td>
                          <Td className="text-center">
                            { chapter.subject?.name || ''}
                          </Td>
                          <Td className="text-center">
                            { chapter.name }
                          </Td>
                          <Td className="text-center ">
                            <Button.Primary onClick={() => {
                              setSelectedChapterId(chapter.id);
                              editChapterModalHandler(chapter.name, chapter.subject.name || '')
                            }} type="button" className="inline-flex items-center mr-1.5">
                              <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                              Ubah
                            </Button.Primary>
                            <Button.Danger onClick={() => {
                              setSelectedChapterId(chapter.id);
                              setIsConfirmationModalShow(true);
                            }} type="button" className="inline-flex items-center">
                              <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                              Hapus
                            </Button.Danger>
                          </Td>
                        </tr>  
                      )
                    }
                    {
                      (chapters?.data).length === 0 && (
                        <tr>
                          <Td colSpan={4} className="text-center">Bab tidak ditemukan</Td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              )
            }
            {
              isLoading && <SkeletonTable />
            }
            {
              (chapters?.data)?.length > 0 && <Pagination totalShow={chapters?.data?.length} total={chapters.total} lastPage={chapters.last_page} currentPage={chapters.current_page} onCurrentPageChange={onCurrentPageChange} perPage={chapters.per_page}/>
            }
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(Chapters, 'crud chapter');
