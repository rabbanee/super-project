import Layout from '@layouts/Layout';
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
   <Layout title={'Loading'} className="h-screen w-screen flex items-center justify-center bg-white">   
      <Loader
        type="Puff"
        color="#54B69B"
        height={200}
        width={200}
      />
   </Layout>
  );
};

export default Loading;