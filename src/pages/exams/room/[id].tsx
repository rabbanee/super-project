import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { useRouter } from 'next/router';
import * as Button from '@elements/Button';
import ContainerFooter from '@elements/container/Footer';
import * as OutlineIcon from '@elements/icon/Outline';
import Link from 'next/link';

interface ExamRoomProps {
  user: User,
}

const ExamRoom = ({ user }: ExamRoomProps) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <LayoutWithSidebar title="Ruang Ujian" user={user}>
      <Container>
        <ContainerBody>
          <div className="flex justify-between">
            <h2 className="text-4xl font-bold	text-black">Ruang Ujian</h2>
            <Link href="/exams">
              <a className="bg-white hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-gray-300 py-2 px-4 text-sm font-medium rounded-md focus:outline-none inline-flex items-center cursor-pointer">
                <OutlineIcon.ArrowLeft className="-ml-1 mr-1 h-5 w-5" />
                Kembali
              </a>
            </Link>
          </div>
          <p className="text-lg mb-2">Deskripsi {id}: </p>
          <div className="w-full flex p-4 shadow-md rounded-xl border border-gray-200">
            <table className="table mt-2 w-full">
              <tbody className="">
                <tr>
                  <th className="w-1/4 text-left">Jumlah Soal</th>
                  <th className="w-1/4">:</th>
                  <td>10</td>
                </tr>
                <tr>
                  <th className="w-1/4 text-left">Durasi</th>
                  <th className="w-1/4">:</th>
                  <td>10 Menit</td>
                </tr>
                <tr>
                  <th className="w-1/4 text-left">KKM</th>
                  <th className="w-1/4">:</th>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContainerBody>
        <ContainerFooter>
          <Button.Primary className="mt-2">
            Kerjakan Ujian
          </Button.Primary>
        </ContainerFooter>
      </Container>
    </LayoutWithSidebar>
  );
};

export default ExamRoom;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [4],
  });

  return {
    props: {
      user, 
    }
  };
});
