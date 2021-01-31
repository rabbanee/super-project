import Layout from "@layouts/Layout";

const ForgotPassword = () => {
  return (
    <Layout title="Forgot Password" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src="/images/icons/icon-512x512.png" alt="E-ZEEY"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Forgot Password
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;