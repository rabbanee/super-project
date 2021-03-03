import dummySubjects from '@data/dummies/subjects';
import grades from '@data/grades';
import options from '@data/options';
import typeOfQuestions from '@data/type-of-questions';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import ListBox from '@modules/ListBox';
import { thisPageFor } from '@utils/thisPageFor';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import * as Button from '@elements/Button';
import ContainerFooter from '@elements/container/Footer';
import Link from 'next/link';
import * as OutlineIcon from '@elements/icon/Outline';
import checkPermissions from '@utils/checkPermissions';

interface AddQuestionsProps {
  user: User,
  permissions: any,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)

const UpdateQuestions = ({ user, permissions }: AddQuestionsProps) => {
  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState(typeOfQuestions[0]);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(options[0]);
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState(dummySubjects[0]);

  return (
    <LayoutWithSidebar user={user} title="Tambah Soal" permissions={permissions}>
      <Container>
        <form>
          <ContainerBody>
            <div className="flex justify-between flex-wrap">
              <h2 className="text-3xl font-bold	text-black mb-2">Tambah Soal</h2>
              <Link href="/questions-bank">
                <a className="bg-white hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-gray-300 py-2 px-4 text-sm font-medium rounded-md focus:outline-none inline-flex items-center cursor-pointer">
                  <OutlineIcon.ArrowLeft className="-ml-1 mr-1 h-5 w-5" />
                  Kembali
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="col-span-2">
                <label className="block text-md font-medium text-gray-700">Soal</label>
                <Editor />
              </div>
              <div className="col-span-2">
                <ListBox items={typeOfQuestions} label="Tipe Soal" selectedItem={selectedTypeOfQuestion} setSelectedItem={setSelectedTypeOfQuestion}/>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <div className={`grid ${selectedTypeOfQuestion === 'Pilihan Ganda' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-6`}>
                  {
                    selectedTypeOfQuestion === 'Pilihan Ganda' &&  <ListBox items={options} label="Jawaban Benar" selectedItem={selectedCorrectAnswer} setSelectedItem={setSelectedCorrectAnswer}/>
                  }
                  <ListBox items={grades} label="Kelas" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/>
                  <ListBox items={dummySubjects} label="Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject} />
                </div>
              </div>
              {
                selectedTypeOfQuestion === 'Pilihan Ganda' ? 
                // Option for Multiple Choice
                (
                  <>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_a" className="block text-md font-medium text-gray-700">Opsi A</label>
                      <textarea name="option_a" id="option_a" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_b" className="block text-md font-medium text-gray-700">Opsi B</label>
                      <textarea name="option_b" id="option_b" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_c" className="block text-md font-medium text-gray-700">Opsi C</label>
                      <textarea name="option_c" id="option_c" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="option_d" className="block text-md font-medium text-gray-700">Opsi D</label>
                      <textarea name="option_d" id="option_d" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      </textarea>
                    </div>
                  </>
                ) :
                //  a input for essay answer
                <div className="col-span-2 sm:col-span-2">
                  <label htmlFor="essay_correct_answer" className="block text-md font-medium text-gray-700">Jawaban Benar</label>
                  <textarea name="essay_correct_answer" id="essay_correct_answer" cols={20} rows={8} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                  </textarea>
                </div>
              }
             
            </div>
          </ContainerBody>
          <ContainerFooter>
            <Button.Primary>
              Buatkan
            </Button.Primary>
          </ContainerFooter>
        </form>
      </Container>
    </LayoutWithSidebar>
  );
};

export default UpdateQuestions;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  checkPermissions({
    context,
    permissions,
    permissionName: 'crud question bank',
  });
  return {
    props: {
      user, 
      permissions,
    }
  };
});
