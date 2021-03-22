import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import { useEffect, useRef, useState } from "react";
import RecapTypeButton from "@modules/RecapTypeButton";
import recapTypes from "@data/recap-types";
import * as SolidIcon from '@elements/icon/Solid';
import Pagination from "@modules/Pagination";
import InputWithIcon from "@modules/InputWithIcon";
import Container from "@elements/container/Index";
import ContainerBody from "@elements/container/Body";
import WithAuth from "@lib/WithAuth";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import SkeletonTable from "@modules/SkeletonTable";
import Cookies from "js-cookie";
import initialDataWithPagination from "@data/initial-data-with-pagination";

interface RecapUserProps {
  user: User,
  permissions: any,
}

const RecapUser = () => {
  let cancelToken: any;
  const [activeRecapType, setActiveRecapType] = useState(0);
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [users, setUsers] = useState(initialDataWithPagination);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token');
  const searchInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    searchInputRef.current.value ? searchUser(searchInputRef.current.value) : getUsersByRole(convertRecapTypeToRoleName(activeRecapType));
  }, [activeRecapType]);

  const convertRecapTypeToRoleName = (recapType: number) => {
    let role = '';
    switch (recapType) {
      case 0:
        role = '';
        break;
      case 1:
        role = 'Wali Siswa';
        break;
      case 2:
        role = 'Siswa';
        break;
      default:
        break;
    }
    return role;
  };

  const getUsersByRole = async (role: string = '', page = 1, query = '') => {
    setIsLoading(true);
    let response: any;
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}recap-user${role.trim() ? `/${role}` : ''}?page=${page}&search=${query}`, {
        cancelToken: cancelToken.token,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    console.log(response);
    setUsers(response.data);
    setIsLoading(false);
  };

  const onCurrentPageChange = ({ currentPage }) => searchInputRef.current.value ? searchUser(searchInputRef.current.value, currentPage) : getUsersByRole(convertRecapTypeToRoleName(activeRecapType), currentPage);

  const searchUser = (query: string, page = 1) => getUsersByRole(convertRecapTypeToRoleName(activeRecapType), page, query);

  return (
    <LayoutWithSidebar user={user} title="Rekap Pengguna" permissions={permissions.list}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <h2 className="text-3xl font-bold	text-black mb-2">{ recapTypes[activeRecapType] }</h2>
          <div className="flex space-x-2 justify-end">
            <RecapTypeButton recapTypes={recapTypes} activeRecapType={activeRecapType} setActiveRecapType={setActiveRecapType} />
          </div>
          <div className="flex justify-end mt-2">
            <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />} onChange={(e) => searchUser((e.target.value).trim())} searchInputRef={searchInputRef}/>
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
                    No
                  </Th>
                  <Th className="text-center">
                    Nama
                  </Th>
                  <Th className="text-center">
                    E-mail
                  </Th>
                  <Th className="text-center">
                    Rol
                  </Th>
                  <Th className="text-center">
                    Dibuat pada
                  </Th>
                </tr>
              </thead>
              <tbody>
                {
                  (users?.data?.length === 0 && !isLoading) && (
                    <tr>
                      <Td colSpan={5} className="text-center">Tidak ada data</Td>
                    </tr>
                  )
                }
                {
                  users?.data?.map((user, userIndex) => 
                    <tr key={`${user.name}-${userIndex}`}>
                      <Td className="text-center"> { (1 + ((users.current_page - 1) * users.per_page)) + userIndex }</Td>
                      <Td className="text-center">{user.name}</Td>
                      <Td className="text-center">{user.email}</Td>
                      <Td className="text-center">{user.roles[0].name}</Td>
                      <Td className="text-center">{user.created_at}</Td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          }
          {
            ((users?.data)?.length > 0 && !isLoading) && <Pagination totalShow={users.data.length}  total={users.total} lastPage={users.last_page} currentPage={users.current_page} onCurrentPageChange={onCurrentPageChange} perPage={users.per_page}/>
          }
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default WithAuth(RecapUser, 'recap user');