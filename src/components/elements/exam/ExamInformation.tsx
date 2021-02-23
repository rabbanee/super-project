interface ExamInformationProps {
  exam?: {
    subject: string,
    grade: string,
    startDate: string,
    endDate: string,
    minimumScore: string,
    totalQuestions: string,
    duration: string,
  },
}

const ExamInformation = ({ exam }: ExamInformationProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold	text-black antialiased">Informasi Ujian</h2>
      <table className="table mt-2 w-full">
        <tbody>
          <tr>
            <th className="w-1/2 text-left">Pelajaran</th>
            <td className="text-base">Matematika</td>
          </tr>
          <tr>
            <th className="w-1/2 text-left">Kelas</th>
            <td className="text-base">XII - RPL</td>
          </tr>
          <tr>
            <th className="w-1/2 text-left">Tanggal Mulai</th>
            <td className="text-base">02/20/2021 - 09:30</td>
          </tr>
          <tr>
            <th className="w-1/2 text-left">Tanggal Selesai</th>
            <td className="text-base">02/20/2021 - 09:30</td>
          </tr>
          <tr>
            <th className="w-1/2 text-left">KKM</th>
            <td className="text-base">
              <span className="border border-blue-400 bg-blue-100 text-blue-400 px-2 py-1 rounded">100</span>
            </td>
          </tr>
          <tr>
            <th className="w-1/2 text-left">Jumlah Soal</th>
            <td className="text-base">10</td>
          </tr>
          <tr>
            <th className="w-1/2 text-left">Durasi</th>
            <td className="text-base">
              <span className="border border-green-400 bg-green-400 text-white px-2 py-2 rounded">10 Minutes</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExamInformation;