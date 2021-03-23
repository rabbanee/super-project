import { useEffect, useRef, useState } from 'react';
import * as OutlineIcon from '@elements/icon/Outline';
import * as Button from '@elements/Button';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { roleNames } from '@data/roles';
import ListBox from '@modules/ListBox';
import { closeAlert, showAlert } from 'redux/actions';
import { User } from '@interface/User';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import ContainerFooter from '@elements/container/Footer';
import grades from '@data/grades';
import { useDispatch, useSelector } from 'react-redux';
import usePermissions from '@lib/usePermissions';
import ApiSource from '@data/api-source';
import Cookies from 'js-cookie';
import WithAuth from '@lib/WithAuth';
import axios from 'axios';

interface AddUser {
  user: User,
  permissions: any,
}

const AddUser = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleNames[0]);
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const tokenFromCookie = Cookies.get('token');
  const [students, setStudents] = useState(null);
  const [studentNames, setStudentNames] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const dispatch: Function = useDispatch();
  const studentRef = useRef<HTMLSelectElement>();

  const handleRegister = async (e) => {
    e.preventDefault();
    let response;
    setIsLoading(true);

    dispatch(closeAlert());
    if (password !== passwordConfirmation) {
      dispatch(showAlert({
        title: 'Kata sandi harus sama dengan konfirmasi kata sandi',
        type: 'error',
      }));

      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      dispatch(showAlert({
        title: 'Kata sandi minimal 8 karakter',
        type: 'error',
      }));     
      setIsLoading(false);
      return;
    }

    const role = selectedRole;
    const grade = selectedGrade;
    const studentId = studentRef.current.value;

    try {
      response = await ApiSource.register(name, email, role, password, passwordConfirmation, grade, studentId, tokenFromCookie);
    } catch (error) {
      console.log(error.response);
      if (error?.response?.data?.errors) {
        dispatch(showAlert({
         title:  error?.response?.data?.message || 'Terjadi Kesalahan',
         description: error?.response?.data?.errors[Object.keys(error?.response?.data?.errors || '')[0]][0] || 'Mohon coba kembali :)',
         type: 'error',
       })); 
      } else {
        dispatch(showAlert({
         title:  error?.response?.data?.message || 'Terjadi Kesalahan',
         type: 'error',
       })); 
      }
      setIsLoading(false);
      return;
    }
    console.log(response);
    dispatch(showAlert({
      title: 'Berhasil menambahkan pengguna!',
      type: 'success',
    })); 
    
    setIsLoading(false);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}students`, {
        headers: {
          'Authorization': `Bearer ${tokenFromCookie}`,
        }
      });
    } catch (error) {
      return error;
    }
    const studentNames = response.data.map((student) => `${student.user.name} ${student.grade.name}`);
    setStudentNames(studentNames);
    setSelectedStudentName(studentNames[0]);
    setStudents(response.data);
  };

  return (
    <LayoutWithSidebar title="Tambahkan Pengguna" user={user} permissions={permissions.list}>
      <form onSubmit={handleRegister}>
        <Container>
          <ContainerBody>
            <h2 className="text-4xl font-bold	text-black mb-2">Tambahkan Pengguna</h2>
            <div className="grid grid-cols-6 gap-4 mt-2">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setName(e.target.value)} placeholder="Nama" />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email_address" id="email_address" autoComplete="email" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />  
              </div>

              <div className="col-span-6 sm:col-span-6">
                <ListBox items={roleNames} label="Rol" selectedItem={selectedRole} setSelectedItem={setSelectedRole}/>
              </div>

              {
                selectedRole === 'Wali Siswa' && (
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="student" className="block text-sm font-medium text-gray-700">Siswa</label>
                    <select id="student" ref={studentRef} className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" disabled={students.length === 0}>
                      {
                        students?.map((student) => 
                          <option value={student.id} key={student.id}>{student.user.name} {student.grade.name}</option>
                        )
                      }
                    </select>
                  </div>
                )
              }

              {
                selectedRole === 'Siswa' && (
                  <div className="col-span-6 sm:col-span-6">
                    <ListBox items={grades} label="Kelas" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/>
                  </div>
                )
              }

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                <input type="password" name="password" id="password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi" />
              </div>
              
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="password-confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                <input type="password" name="password-confirmation" id="password-confirmation" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Konfirmasi Kata Sandi" />
              </div>
            </div>
          </ContainerBody>
          <ContainerFooter>
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'} group relative w-full flex justify-center`}
              disabled={isLoading}
            >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                }
                {
                  isLoading ? 'Memproses' : 'Tambahkan'
                }
            </Button.Primary>
          </ContainerFooter>
        </Container>
      </form>
    </LayoutWithSidebar>
  )
};

export default WithAuth(AddUser, 'register');