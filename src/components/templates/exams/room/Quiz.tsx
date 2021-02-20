import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Layout from '@layouts/Layout';
import * as Button from '@elements/Button';
import * as OutlineIcon from '@elements/icon/Outline';

const Quiz = () => {
  return (
    <Layout title="Ruang Ujian" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="bg-white shadow-md rounded mb-2 w-3/4 mx-auto px-6 py-4">
        <div className="divide-x-2 divide-gray-200 flex w-1/2 space-x-4">
          <span className="cursor-pointer " onClick={() => console.log('clicked!')}>
            <OutlineIcon.Pause className="h-6 w-6 text-blue-400"/>
          </span>
          <div className="flex items-center pl-4 space-x-1">
            <OutlineIcon.Clock className="h-6 w-6 text-gray-400" />
            <p>00:25:09</p>
          </div>
          <div className="flex items-center pl-4 space-x-1">
            <p className="font-bold">Soal 2/20</p>
          </div>
        </div>
      </div>
      <div className="flex space-y-3 w-full flex-col">
        <div className="flex space-x-2 w-full">
          <div className="bg-white w-2/3 rounded-md shadow-sm">
            <div className="px-6 py-5 w-full">
              <p className="text-md">Soal 1 dari 5</p>
              <h2 className="mt-2 font-bold text-2xl">Konfigurasi Elektron dari unsur Ar18</h2>
            </div>
            <ul>
              <li>
                <input id="radio1" type="radio" name="radio" className="hidden"  />
                <label htmlFor="radio1" className="flex items-center py-3 w-full hover:bg-blue-100 h-full px-6 cursor-pointer">
                  <span className="w-8 h-8 inline-flex items-center justify-center mr-2 rounded-full flex-shrink-0 border border-gray-200 after-label-checked:border-blue-400 shadow after-label-checked:bg-blue-400 bg-gray-200 after-label-checked:text-white">A</span>
                  The Best choice
                </label>
              </li>
              <li>
                <input id="radio2" type="radio" name="radio" className="hidden"  />
                <label htmlFor="radio2" className="flex items-center py-3 w-full hover:bg-blue-100 h-full px-6 cursor-pointer">
                  <span className="w-8 h-8 inline-flex items-center justify-center mr-2 rounded-full flex-shrink-0 border border-gray-200 after-label-checked:border-blue-400 shadow after-label-checked:bg-blue-400 bg-gray-200 after-label-checked:text-white">B</span>
                  Better choice
                </label>
              </li>
              <li>
                <input id="radio3" type="radio" name="radio" className="hidden"  />
                <label htmlFor="radio3" className="flex items-center py-3 w-full hover:bg-blue-100 h-full px-6 cursor-pointer">
                  <span className="w-8 h-8 inline-flex items-center justify-center mr-2 rounded-full flex-shrink-0 border border-gray-200 after-label-checked:border-blue-400 shadow after-label-checked:bg-blue-400 bg-gray-200 after-label-checked:text-white">C</span>
                  Worse choice
                </label>
              </li>
              <li>
                <input id="radio4" type="radio" name="radio" className="hidden"  />
                <label htmlFor="radio4" className="flex items-center py-3 w-full hover:bg-blue-100 h-full px-6 cursor-pointer">
                  <span className="w-8 h-8 inline-flex items-center justify-center mr-2 rounded-full flex-shrink-0 border border-gray-200 after-label-checked:border-blue-400 shadow after-label-checked:bg-blue-400 bg-gray-200 after-label-checked:text-white">D</span>
                  The Worst choice
                </label>
              </li>
            </ul>
          </div>
          <div className="bg-white w-1/3">
            s
          </div>
        </div>
        <div className="flex space-x-2 w-full">
          <div className="w-2/3 flex justify-between">
            <Button.Secondary>
              Sebelumnya
            </Button.Secondary>
            <Button.Primary>
              Selanjutnya
            </Button.Primary>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;