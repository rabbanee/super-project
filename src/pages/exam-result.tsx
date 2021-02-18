import ContainerBody from "@elements/container/Body";
import Container from "@elements/container/Index";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";


interface ExamResultProps {
  user: User,
}

const ExamResult = ({ user }: ExamResultProps) => {
  return (
    <LayoutWithSidebar title="Hasil Ujian" user={user}>
      <Container>
        <ContainerBody>
          <div className="mb-4">
            <h2 className="text-4xl font-bold	text-black dark:text-gray-100">Hasil Ujian</h2>
            <p className="text-lg leading-4">{user.name}</p>
          </div>
          <div className="border-t border-b  border-gray-200 py-3 flex justify-between">
            <ul className="flex flex-col space-y-2 w-full">
              <li>
                <span className="font-bold w-4/12 inline-block">Pelajaran</span>
                <span>Kimia</span>
              </li>
              <li>
                <span className="font-bold w-4/12 inline-block">Kelas</span>
                <span>XII RPL</span>
              </li>
              <li>
                <span className="font-bold w-4/12 inline-block">Tanggal Mulai</span>
                <span>25 Januari 2020</span>
              </li>
              <li>
                <span className="font-bold w-4/12 inline-block">Tanggal Selesai</span>
                <span>26 Januari 2020</span>
              </li>
            </ul>
            <ul className="flex flex-col space-y-2 w-full">
              <li>
                <span className="font-bold w-4/12 inline-block">Nilai</span>
                <span>50</span>
              </li>
              <li>
                <span className="font-bold w-4/12 inline-block">Jumlah Soal</span>
                <span>10</span>
              </li>
              <li>
                <span className="font-bold w-4/12 inline-block">Durasi Ujian</span>
                <span>10 Menit</span>
              </li>
              <li>
                <span className="font-bold w-4/12 inline-block">Ujian selesai selama</span>
                <span>00:00:10</span>
              </li>
            </ul>
          </div>
          
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default ExamResult;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  
  return {
    props: {
      user, 
    }
  };
});
