import ContainerBody from "@elements/container/Body";
import Container from "@elements/container/Index";
import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';

interface ExamResultProps {
  user: User,
  permissions: any,
}

const ExamResult = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  return (
    <LayoutWithSidebar title="Hasil Ujian" user={user}  permissions={permissions.list}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <div className="mb-4">
            <h2 className="text-4xl font-bold	text-black dark:text-gray-100">Hasil Ujian</h2>
            <p className="text-lg leading-4">{user.name}</p>
          </div>
          <div className="border-t border-b  border-gray-200 py-3 sm:flex sm:justify-between">
            <ul className="flex flex-col space-y-2 w-full">
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Pelajaran</span>
                <span>Kimia</span>
              </li>
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Kelas</span>
                <span>XII RPL</span>
              </li>
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Tanggal Mulai</span>
                <span>25 Januari 2020</span>
              </li>
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Tanggal Selesai</span>
                <span>26 Januari 2020</span>
              </li>
            </ul>
            <ul className="flex flex-col space-y-2 w-full">
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Nilai</span>
                <span>50</span>
              </li>
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Jumlah Soal</span>
                <span>10</span>
              </li>
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Durasi Ujian</span>
                <span>10 Menit</span>
              </li>
              <li className="inline-flex items-center flex-wrap">
                <span className="font-bold w-4/12 inline-block">Ujian selesai selama</span>
                <span>00:00:10</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 md:flex md:space-x-2 space-y-4 md:space-y-0">
            <div className="shadow border border-gray-200 p-6 flex items-center justify-center flex-col rounded-lg md:w-1/2">
              <h3 className="text-primary text-8xl">0</h3>
              <span className="text-primary text-3xl">Nilai</span>
            </div>
            <div className="md:flex flex-wrap md:w-1/2 space-y-4 md:space-y-2">
              <div className="md:flex md:space-x-2 w-full space-y-4 md:space-y-0">
                <div className="shadow border border-gray-200 p-6 flex flex-col rounded-lg md:w-1/2">
                  <h3 className="text-gray-500 text-4xl">0</h3>
                  <span className="text-gray-500 text-lg">Jumlah Jawaban Benar</span>
                </div>
                <div className="shadow border border-gray-200 p-6 flex flex-col rounded-lg md:w-1/2">
                  <h3 className="text-gray-500 text-4xl">10</h3>
                  <span className="text-gray-500 text-lg">Jumlah Jawaban Salah</span>
                </div>
              </div>
              <div className="md:flex md:justify-between md:space-x-2 w-full md:space-y-0 space-y-4">
                <div className="shadow border border-gray-200 p-6 flex flex-col rounded-lg md:w-1/2">
                  <h3 className="text-gray-500 text-4xl">10</h3>
                  <span className="text-gray-500 text-lg">Jumlah Jawaban Tidak Terjawab</span>
                </div>
                <div className="shadow border border-gray-200 p-6 flex flex-col rounded-lg md:w-1/2">
                  <h3 className="text-gray-500 text-4xl">10</h3>
                  <span className="text-gray-500 text-lg">Ragu</span>
                </div>
              </div>
            </div>
          </div>
          <Table>
            <thead className="bg-primary">
              <Th className="text-xs uppercase">
                #
              </Th>
              <Th className="text-xs uppercase">
                Soal
              </Th>
              <Th className="text-xs uppercase">
                Jawaban Benar
              </Th>
              <Th className="text-xs uppercase">
                Jawaban
              </Th>
              <Th className="text-xs uppercase">
                Nilai
              </Th>
            </thead>
            <tbody>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">1</Td>
                <Td className="text-sm whitespace-nowrap text-black truncate">Konfigurasi Elektron dari unsur Ar18 adalah</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 text-green-400 rounded-md">A</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-red-100 p-2 text-red-400 rounded-md">C</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-red-100 p-2 text-red-400 rounded-md">0</span>
                </Td>
              </tr>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">2</Td>
                <Td className="text-sm whitespace-nowrap text-black truncate">Bagian atom yang bermuatan netral adalah</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 text-green-400 rounded-md">Neutron</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 text-green-400 rounded-md">Neutron</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 text-green-400 rounded-md">10</span>
                </Td>
              </tr>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">2</Td>
                <Td className="text-sm whitespace-nowrap text-black truncate">Bagian atom yang bermuatan positif adalah</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 text-green-400 rounded-md">Proton</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-yellow-100 p-2 text-yellow-400 rounded-md">Tidak Terjawab</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-red-100 p-2 text-red-400 rounded-md">0</span>
                </Td>
              </tr>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">2</Td>
                <Td className="text-sm whitespace-nowrap text-black truncate">Bagian atom yang bermuatan negatif adalah</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 text-green-400 rounded-md">Elektron</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-yellow-100 p-2 text-yellow-400 rounded-md">Ragu</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-red-100 p-2 text-red-400 rounded-md">0</span>
                </Td>
              </tr>
            </tbody>
          </Table>
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default WithAuth(ExamResult);
// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  
//   return {
//     props: {
//       user, 
//       permissions,
//     }
//   };
// });
