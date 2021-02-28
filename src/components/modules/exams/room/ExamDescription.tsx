import ContainerBody from "@elements/container/Body";
import ContainerFooter from "@elements/container/Footer";
import Container from "@elements/container/Index";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import Link from "next/link";
import * as OutlineIcon from '@elements/icon/Outline';
import * as Button from '@elements/Button';
import { User } from "@interface/User";

interface ExamDescriptionProps {
  user: User,
  examDescription: {
    id: string | string[],
  },
  setIsStudentOnATest: Function,
  permissions: any,
}

const ExamDescription = ({ user, examDescription, setIsStudentOnATest, permissions } : ExamDescriptionProps) => {
  return (
    <LayoutWithSidebar title="Ruang Ujian" user={user} permissions={permissions}>
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
          <p className="text-lg mb-2">Deskripsi {examDescription.id}: </p>
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
          <Button.Primary className="mt-2" onClick={() => setIsStudentOnATest(true)} type="button">
            Kerjakan Ujian
          </Button.Primary>
        </ContainerFooter>
      </Container>
    </LayoutWithSidebar>
  );
};

export default ExamDescription;