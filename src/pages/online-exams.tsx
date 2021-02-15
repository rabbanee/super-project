import React from 'react';
import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";


interface OnlineExamsProps {
  user: User,
}

const OnlineExams = ({ user }: OnlineExamsProps) => {
  return (
    <LayoutWithSidebar user={user} title="Rekap Pengguna">
      <div className="shadow-md container mx-auto rounded-xl">
        <div className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
          <h2 className="text-3xl font-bold	text-black mb-2">Rekap Pengguna</h2>
          
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
                  Rol
                </Th>
                <Th>
                  Email
                </Th>
                <Th>
                  Dibuat pada
                </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>1</Td>
                <Td>Daffa</Td>
                <Td>daffa@rabbanee.com</Td>
                <Td>Admin</Td>
                <Td>22 Agustus 2020</Td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-xl">
        </div>
      </div>
    </LayoutWithSidebar>
  );
};

export default OnlineExams;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});