import showEntries from '@data/show-entries';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import ListBox from '@modules/ListBox';
import Pagination from '@modules/Pagination';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import dummySubjects from '@data/dummies/subjects';
import { User } from '@interface/User';
import { useEffect, useRef, useState } from 'react';
import InputWithIcon from '@modules/InputWithIcon';
import * as SolidIcon from '@elements/icon/Solid';
import grades from '@data/grades';
import attitudes from '@data/attitudes';
import * as OutlineIcon from '@elements/icon/Outline';
import Title from '@elements/Title';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import semesters from '@data/semester';
import ContainerFooter from '@elements/container/Footer';
import * as Button from '@elements/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AsyncPaginate } from 'react-select-async-paginate';
import SkeletonTable from '@modules/SkeletonTable';
import { showAlert } from '@actions/index';
import ConfirmationModal from '@modules/ConfirmationModal';

const AttitudeAssessment = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const token = Cookies.get('token');
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [loading, setLoading] = useState('');
  const [attitudeAssessments, setAttitudeAssessments] = useState(null);
  const [students, setStudents] = useState(null);
  const formRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch: Function = useDispatch();

  useEffect(() => {
    getGrades();
  }, []);

  useEffect(() => {
    getAttitudeAssessment();
  }, [selectedGrade, selectedSemester]);

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
    setSelectedGrade(response.data[0]);
    return {
      options: response.data,
      hasMore: false,
    }
  };

  const getAttitudeAssessment = async (page = 1) => {
    let response: any;
    setLoading('getting attitude assessment');
    setAttitudeAssessments(null);
    setStudents(null);
    if (selectedGrade === null) {
      return;
    }
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}attitude-assessment/${selectedSemester}/${selectedGrade.id}?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    if (response?.data.data?.[0]?.semester) {
      setStudents(null);
      setAttitudeAssessments(response.data);
    } else {
      setAttitudeAssessments(null);
      setStudents(response.data);
    }
    setLoading(null);
  };  
  
  const createAttitudeAssessment = async () => {
    let response: any;
    const form = formRef.current;
    let payload: any = {
      semester: selectedSemester,
    };
    let behaviors = form['behavior[]'];
    const neatness = form['neatness[]'];
    const discipline = form['discipline[]'];
    const cooperation = form['cooperation[]'];
    const creative = form['creative[]'];
    const information = form['information[]'];
    if ([...behaviors].length === 4) {
      payload = {
        ...payload,
        attitude_assessment: [
          {
            student_id: behaviors.id,
            behavior: behaviors.value,
            neatness: neatness.value,
            discipline: discipline.value,
            cooperation: cooperation.value,
            creative: creative.value,
            information: information.value,
          },
        ],
      };
    } else {
      let attitudeAssessments = [];
      [...behaviors].forEach((behavior, behaviorIndex) => {
        console.log(behaviorIndex);
        attitudeAssessments.push({
          student_id: behavior.id,
          behavior: behavior.value,
          neatness: [...neatness][behaviorIndex].value,
          discipline: [...discipline][behaviorIndex].value,
          cooperation: [...cooperation][behaviorIndex].value,
          creative: [...creative][behaviorIndex].value,
          information: [...information][behaviorIndex].value,
        });
      });
       payload = {
        ...payload,
        attitude_assessment: attitudeAssessments,
      };
    }

    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}attitude-assessment`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      dispatch(showAlert({
        type: 'error',
        title: 'Terjadi kesalahan saat menambah penilaian sikap',
      }))
      return error;
    }
    dispatch(showAlert({
      type: 'success',
      title: 'Berhasil menambah penilaian sikap',
    }));
    getAttitudeAssessment();
    console.log(payload);
  };
  
  const updateAttitudeAssessment = async () => {
    let response: any;
    const form = formRef.current;
    let payload: any = {
      semester: selectedSemester,
    };
    let behaviors = form['behavior[]'];
    const neatness = form['neatness[]'];
    const discipline = form['discipline[]'];
    const cooperation = form['cooperation[]'];
    const creative = form['creative[]'];
    const information = form['information[]'];
    if ([...behaviors].length === 4) {
      payload = {
        ...payload,
        attitude_assessment: [
          {
            student_id: behaviors.id,
            behavior: behaviors.value,
            neatness: neatness.value,
            discipline: discipline.value,
            cooperation: cooperation.value,
            creative: creative.value,
            information: information.value,
          },
        ],
      };
    } else {
      let attitudeAssessments = [];
      [...behaviors].forEach((behavior, behaviorIndex) => {
        console.log(behaviorIndex);
        attitudeAssessments.push({
          student_id: behavior.id,
          behavior: behavior.value,
          neatness: [...neatness][behaviorIndex].value,
          discipline: [...discipline][behaviorIndex].value,
          cooperation: [...cooperation][behaviorIndex].value,
          creative: [...creative][behaviorIndex].value,
          information: [...information][behaviorIndex].value,
        });
      });
       payload = {
        ...payload,
        attitude_assessment: attitudeAssessments,
      };
    }

    try {
      response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}attitude-assessment/${selectedSemester}`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error.response);
      dispatch(showAlert({
        type: 'error',
        title: 'Terjadi kesalahan saat mengubah penilaian sikap',
      }))
      return error;
    }
    dispatch(showAlert({
      type: 'success',
      title: 'Berhasil mengubah penilaian sikap',
    }))
  };

  const onCurrentPageChange = ({ currentPage }) => searchInputRef.current.value ? null : getAttitudeAssessment(currentPage);

  const saveAttitudeAssessment = async (e: any) => {
    setLoading('saving');
    e.preventDefault();
    if (students !== null) {
      await createAttitudeAssessment();
    } else if (attitudeAssessments !== null) {
      await updateAttitudeAssessment();
    } else {
      setLoading(null);
      return;
    }
    setLoading(null);
  };
  
  const deleteAttitudeAssessment = async () => {
    let response: any;
    // setLoading('deleting');
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}attitude-assessment/${selectedGrade.id}/${selectedSemester}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error.response);
      dispatch(showAlert({
        type: 'error',
        title: 'Gagal menghapus penilaian sikap',
      }));
      return error;
    }
    console.log(response);
    dispatch(showAlert({
      type: 'success',
      title: 'Berhasil menghapus penilaian sikap',
    }));
    // setLoading(null);
  }

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Materi Pembelajaran" description="Apakah Anda yakin ingin menghapus materi pembelajaran ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={deleteAttitudeAssessment}/>
      <LayoutWithSidebar user={user} title="Penilaian Sikap" permissions={permissions.list}>
        <Container>
          <form onSubmit={saveAttitudeAssessment} ref={formRef}>
            <ContainerBody>
              <div className="flex justify-between mb-2">
                <Title>Penilaian Sikap</Title>
                {
                  (attitudeAssessments !== null && loading !== 'getting attitude assessment') &&  
                  <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                    <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                    Hapus
                  </Button.Danger>
                }
              </div>
              <div className="flex justify-between space-y-3 items-end">
                <div className="flex space-x-4">
                  <div className="w-24">
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
                  {/* <ListBox items={grades} selectedItem={selectedGrade} setSelectedItem={setSelectedGrade} label="Kelas" /> */}
                  <ListBox items={semesters} selectedItem={selectedSemester} setSelectedItem={setSelectedSemester} label="Semester" />
                </div>
                <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
              </div>
              {
                loading === 'getting attitude assessment' && <SkeletonTable />
              }
              {
                (students !== null || attitudeAssessments !== null) &&
                <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
                  <thead className="bg-primary">
                    <tr>
                      <Th>
                        No
                      </Th>
                      <Th>
                        Nama
                      </Th>
                      <Th>
                        Perilaku
                      </Th>
                      <Th>
                        Kerapian
                      </Th>
                      <Th>
                        Kedisiplinan
                      </Th>
                      <Th>
                        Kerja sama
                      </Th>
                      <Th>
                        Kreatif
                      </Th>
                      <Th>
                        Keterangan
                      </Th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      (attitudeAssessments !== null && loading !== 'getting attitude assessment') &&
                      attitudeAssessments?.data?.map((attitudeAssessment) =>
                        <tr key={attitudeAssessment.id}>
                          <Td className="text-center">1</Td>
                          <Td>{attitudeAssessment?.student?.user?.name}</Td>
                          <td className="px-2">
                            <select name="behavior[]" id={`${attitudeAssessment?.student?.id}`} className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm hai" defaultValue={attitudeAssessment.behavior.toLowerCase()}>
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="neatness[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" defaultValue={attitudeAssessment.neatness.toLowerCase()}>
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="discipline[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" defaultValue={attitudeAssessment.discipline.toLowerCase()}>
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="cooperation[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" defaultValue={attitudeAssessment.cooperation.toLowerCase()}>
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="creative[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" defaultValue={attitudeAssessment.creative.toLowerCase()}>
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <input id="information[]" name="information[]" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan"  defaultValue={attitudeAssessment.information}/>
                          </td>
                        </tr>
                      )
                    }
                    {
                      (students !== null && loading !== 'getting attitude assessment' && students.data.length === 0) && 
                      <tr>
                        <Td colSpan={9} className="text-center">Tidak ada siswa</Td>
                      </tr>
                    }
                    {
                     (students !== null && loading !== 'getting attitude assessment') && students?.data?.map((student) => 
                        <tr key={student.id}>
                          <Td className="text-center">1</Td>
                          <Td>{student?.user?.name}</Td>
                          <td className="px-2">
                            <select name="behavior[]" id={`${student?.id}`} className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="neatness[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="discipline[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="cooperation[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <select name="creative[]" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                              {
                                attitudes.map((attitude, attitudeIndex) => 
                                  <option key={attitudeIndex} value={attitude.toLowerCase()}>{attitude}</option>
                                )
                              }
                            </select>
                          </td>
                          <td className="px-2">
                            <input id="information" name="information[]" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan" />
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              }
              {
                (loading !== 'getting attitude assessment' && attitudeAssessments?.data?.length > 0) && <Pagination totalShow={attitudeAssessments?.data?.length} currentPage={attitudeAssessments?.current_page} total={attitudeAssessments?.total} lastPage={attitudeAssessments?.last_page} perPage={attitudeAssessments?.per_page} onCurrentPageChange={onCurrentPageChange} />
              }
              {
                (loading !== 'getting attitude assessment' && students?.data?.length > 0) && <Pagination totalShow={students?.data?.length} currentPage={students?.current_page} total={students?.total} lastPage={students?.last_page} perPage={students?.per_page} onCurrentPageChange={onCurrentPageChange} />
              }
            </ContainerBody>
            <ContainerFooter className="justify-end flex">
              {
               (students?.data?.length > 0 || attitudeAssessments?.data?.length > 0) &&
                <Button.Primary  
                  className={`${(loading === 'saving') && 'cursor-not-allowed'} group relative flex justify-center`}
                  disabled={(loading === 'saving')}
                >
                    {
                      (loading === 'saving') && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                    }
                    {
                      (loading === 'saving') ? 'Memproses' : 'Simpan'
                    }
                </Button.Primary>
              }
            </ContainerFooter>
          </form>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(AttitudeAssessment, 'crud attitude assessment');
