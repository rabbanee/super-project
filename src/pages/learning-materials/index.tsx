import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';
import InputWithIcon from '@modules/InputWithIcon';
import * as SolidIcon from '@elements/icon/Solid';
import { useEffect, useRef, useState } from 'react';
import Pagination from '@modules/Pagination';
import * as Button from '@elements/Button';
import Link from 'next/link';
import ConfirmationModal from '@modules/ConfirmationModal';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import axios from 'axios';
import Cookies from 'js-cookie';
import SkeletonTable from '@modules/SkeletonTable';
import ErrorAndRefresh from '@modules/ErrorAndRefresh';
import { showAlert } from '@actions/index';

const LearningMaterials = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [learningMaterials, setLearningMaterials] = useState(initialDataWithPagination);
  const [selectedLearningMaterialId, setSelectedLearningMaterialId] = useState(null);
  const token = Cookies.get('token');
  const dispatch: Function = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    getLearningMaterials();
  }, []);

  const onCurrentPageChange = ({ currentPage }) => searchInputRef.current.value ? searchLearningMaterials(searchInputRef.current.value, currentPage) : getLearningMaterials(currentPage);

  const searchLearningMaterials = async (query, page) => {
    setIsLoading(true);
    let response: any;
    if (!query.trim()) {
      getLearningMaterials(page);
      return;
    }
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}learning-materials/search/${query}?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setLearningMaterials(null);
      setIsLoading(false);
      return error;
    }
    setIsLoading(false);
    setLearningMaterials(response.data);
  }

  const getLearningMaterials = async (page = 1) => {
    setIsLoading(true);
    let response: any;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}learning-materials?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      setIsLoading(false);
      return error;
    }
    setIsLoading(false);
    setLearningMaterials(response.data);
  }

  const deleteLearningMaterials = (learningMaterialId) => {
    setIsConfirmationModalShow(true);
    setSelectedLearningMaterialId(learningMaterialId);
  };

  const destroyLearningMaterial= async () => {
    let response: any;
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}learning-materials/${selectedLearningMaterialId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      dispatch(showAlert({
        title: 'Terjadi kesalahan saat menghapus materi pembelajaran!',
        type: 'error',
      }));
      setIsConfirmationModalShow(false);
      return error;
    }
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil menghapus materi pembelajaran!',
        type: 'success',
      }));
      getLearningMaterials();
      setIsConfirmationModalShow(false);
    };
  };

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Materi Pembelajaran" description="Apakah Anda yakin ingin menghapus materi pembelajaran ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={destroyLearningMaterial}/>
      <LayoutWithSidebar title="Materi Pembelajaran" user={user} permissions={permissions.list}>
        <Container>
          <ContainerBody className="rounded-b-xl space-y-2">
            <div className="flex justify-between items-baseline flex-wrap">
              <h2 className="text-3xl font-bold	text-black mb-2">Materi Pembelajaran</h2>
              <Link href="/learning-materials/add">
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" /> 
                  Tambah Materi Pembelajaran
                </a>
              </Link>
            </div>
            <div className="flex justify-end space-y-3">
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />} onChange={(e) => searchLearningMaterials((e.target.value).trim(), 1)} searchInputRef={searchInputRef} />
            </div>
            {
              isLoading && <SkeletonTable />
            }
            {
              (!isLoading && learningMaterials === null) && <ErrorAndRefresh title="Terjadi Kesalahan ketika sedang mendapatkan data" onRefresh={getLearningMaterials}/>
            }
            {
              (!isLoading && learningMaterials !== null) && 
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
                      Judul Materi
                    </Th>
                    <Th className="text-center">
                      Di-update pada
                    </Th>
                    <Th className="text-center">
                      Aksi
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (learningMaterials?.data)?.length === 0 && (
                      <tr>
                        <Td colSpan={6} className="text-center">Materi pembelajaran tidak ditemukan atau Anda belum membuat materi pembelajaran</Td>
                      </tr>
                    )
                  }
                  {
                    learningMaterials?.data?.map((learningMaterial, learningMaterialIndex) => 
                      <tr key={learningMaterial.id}>
                        <Td className="text-center">{ learningMaterialIndex += 1 }</Td>
                        <Td className="text-center">{ learningMaterial.subject.name }</Td>
                        <Td className="text-center">{ learningMaterial.chapter.name }</Td>
                        <Td className="text-center truncate">{ learningMaterial.title }</Td>
                        <Td className="text-center">{ learningMaterial.updated_at }</Td>
                        <Td className="text-center flex justify-center space-x-2">
                          <Link href={`/learning-materials/update/${learningMaterial.id}`} passHref>
                            <a className="btn btn-primary inline-flex items-center">
                              <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                              Ubah
                            </a>
                          </Link>
                          <Button.Danger onClick={() => deleteLearningMaterials(learningMaterial.id)} type="button" className="inline-flex items-center">
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
              (!isLoading && learningMaterials?.data?.length > 0) && <Pagination totalShow={learningMaterials?.data?.length} currentPage={learningMaterials?.current_page} total={learningMaterials?.total} lastPage={learningMaterials?.last_page} perPage={learningMaterials?.per_page} onCurrentPageChange={onCurrentPageChange} />
            }
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(LearningMaterials, 'crud learning materials');