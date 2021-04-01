import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import Link from 'next/link';
import * as SolidIcon from '@elements/icon/Solid';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Pagination from '@modules/Pagination';
import Td from '@elements/Td';
import * as Button from '@elements/Button';
import ConfirmationModal from '@modules/ConfirmationModal';
import { useEffect, useRef, useState } from 'react';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import SkeletonTable from '@modules/SkeletonTable';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import { showAlert } from '@actions/index';

interface QuestionsBankProps {
  user: User;
  permissions: any;
}

const QuestionsBank = () => {
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [questions, setQuestions] = useState(null);
  const token = Cookies.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>();
  const dispatch: Function = useDispatch();

  useEffect(() => {
    getQuestions();
  }, []);
  
  const getQuestions = async (page = 1) => {
    setIsLoading(true);
    let response: any;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}question?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      return error;
    }
    setQuestions(response.data);
    setIsLoading(false);
  };
  
  const searchQuestions = async (query, page = 1) => {
    setIsLoading(true);
    let response: any;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}question?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      return error;
    }
    console.log(response.data);
    // setQuestions(response.data);
    setIsLoading(false);
  };

  const tes = (options) => {
    const tes = options.find((option) => option.is_true);
    return tes.content;
  }
  
  const onCurrentPageChange = ({ currentPage }) => searchInputRef.current.value ? searchQuestions(searchInputRef.current.value, currentPage) : getQuestions(currentPage);

  const deleteQuestion = (questionId) => {
    setIsConfirmationModalShow(true);
    setSelectedQuestionId(questionId);
  };

  const destroyQuestion = async () => {
    let response: any;
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}question/${selectedQuestionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      dispatch(showAlert({
        title: 'Terjadi kesalahan',
        type: 'error'
      }));
      setIsConfirmationModalShow(false);
      return error;
    }
    setIsConfirmationModalShow(false);
    dispatch(showAlert({
      title: 'Berhasil menghapus soal',
      type: 'success'
    }));
  getQuestions();
  };

  
  const createMarkup = (description: string) => {
    return {
      __html: description,
    }
  }

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Soal" description="Apakah Anda yakin ingin menghapus Soal ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={destroyQuestion}/>
      <LayoutWithSidebar user={user} title="Bank Soal" permissions={permissions.list}>
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold	text-black">Soal Saya</h1>
                <p>{user.name}</p>
              </div>
              <Link href="/question-bank/add">
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" /> 
                  Tambah Soal
                </a>
              </Link>
            </div>
            {
              isLoading && <SkeletonTable />
            }
            {
              !isLoading && 
              <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
                <thead className="bg-primary">
                  <tr>
                    <Th className="text-center">
                      Soal
                    </Th>
                    <Th className="text-center">
                      Jawaban
                    </Th>
                    <Th className="text-center">
                      Pelajaran
                    </Th>
                    <Th className="text-center">
                      Kelas
                    </Th>
                    <Th className="text-center">
                      Aksi
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ((questions?.data)?.length === 0 && !isLoading) && (
                      <tr>
                        <Td colSpan={4} className="text-center">Soal tidak ditemukan atau Anda belum membuatnya</Td>
                      </tr>
                    )
                  }
                  {
                    (!isLoading && questions?.data?.length > 0) &&  questions?.data?.map((question, questionIndex: number) => 
                    <tr key={questionIndex}>
                      <Td className="text-center">
                        <div dangerouslySetInnerHTML={createMarkup(question?.content)} className='ck-content mt-2'></div>
                      </Td>
                      <Td className="text-center">{question?.essay_answer ? question?.essay_answer?.content : tes(question?.options)}</Td>
                      <Td className="text-center">{question.subject.name}</Td>
                      <Td className="text-center truncate">{question.grade.name}</Td>
                      <Td className="text-center flex justify-center space-x-2">
                        <Link href={`/question-bank/update/${question.id}`}>
                          <a className="btn btn-primary inline-flex items-center">
                            <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                            Ubah
                          </a>
                        </Link>
                        <Button.Danger onClick={() => deleteQuestion(question.id)} type="button" className="inline-flex items-center">
                          <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                          Hapus
                        </Button.Danger>
                      </Td>
                    </tr>
                    )
                  }
                </tbody>
              </Table>
            }
            {
              (!isLoading && questions?.data?.length > 0) && <Pagination totalShow={questions?.data?.length} currentPage={questions?.current_page} total={questions?.total} lastPage={questions?.last_page} perPage={questions?.per_page} onCurrentPageChange={onCurrentPageChange} />
            }
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(QuestionsBank, 'crud question bank');
