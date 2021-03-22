import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Title from '@elements/Title';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import Link from 'next/link';
import React, { FormEventHandler, useEffect, useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import ContainerFooter from '@elements/container/Footer';
import * as OutlineIcon from '@elements/icon/Outline';

interface AddOrEditNewsProps {
  user: User,
  news?: any,
  permissions: any,
  isLoading: boolean,
  onSave: FormEventHandler<HTMLFormElement>,
  titleInputRef: any,
  onEditorChanges: Function,
  files: Array<any>,
  setFiles: Function,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)


const AddOrEditNews = ({ user, news, permissions, isLoading, onSave, onEditorChanges, titleInputRef, files, setFiles }: AddOrEditNewsProps) => {
  // const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  
  const thumbs = files.map(file => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  return (
    <LayoutWithSidebar user={user} title="Tambah Berita" permissions={permissions}>
      <Container>
        <form onSubmit={onSave}>
          <ContainerBody>
            <div className="flex justify-between flex-wrap items-start mb-2">
              <Title>{ news ? 'Edit' : 'Tambah' } Berita</Title>
              <Link href={`/news/management`}>
                <a className="btn btn-secondary inline-flex items-center">
                  <SolidIcon.ArrowNarrowLeft className="-ml-1 mr-1 h-5 w-5" />
                  Kembali
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Berita</label>
                <input id="title" name="title" type="text" ref={titleInputRef} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Berita" defaultValue={news?.title || ''}/>
              </div>
              {/* Editor */}
              <div className="col-span-2">
                <label htmlFor="content" className="block text-md font-medium text-gray-700">Isi Konten</label>
                <Editor onEditorChanges={onEditorChanges} data={news?.content || ''} />
              </div>
              {/* Thumbnail */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <div {...getRootProps({className: 'mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md focus:outline-none '})}>
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-darkest focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-darkest">
                        <span>Unggah sebuah file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only"  {...getInputProps()}/>
                      </label>
                      <p className="pl-1">atau <i>drag and drop</i></p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB. 
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="block text-sm font-medium text-gray-700">Preview Thumbnail</p>
                {
                  files.length > 0 ? thumbs : (
                    <img src={news?.image?.id ? `${process.env.NEXT_PUBLIC_API_HOST}images/${news?.image?.id}` : 'https://via.placeholder.com/500x160.png'} alt="preview-image"/>
                  )
                }
              </div>
            </div>
          </ContainerBody>
          <ContainerFooter>
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'} group relative flex justify-center`}
              disabled={isLoading}
            >
              {
                isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
              }
              {
                isLoading ? 'Memproses' : 'Simpan'
              }
            </Button.Primary>
          </ContainerFooter>
        </form>
      </Container>
    </LayoutWithSidebar>
  );
};

export default AddOrEditNews;