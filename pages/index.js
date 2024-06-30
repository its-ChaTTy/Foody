import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: "url('/food.jpg')", backdropFilter: 'blur(8px)'}}>
      <Head>
        <title>Foody</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white bg-opacity-75 rounded-lg p-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to Foody</h1>
        <div className="flex justify-center items-center space-x-4">
          <a href="/auth/login" className="px-8 py-2 border rounded-md text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 mr-10">Login</a>
          <a href="/auth/register" className="px-8 py-2 border rounded-md text-lg font-medium text-gray-700 bg-white hover:bg-gray-100">Register</a>
        </div>
      </div>
    </div>
  )
}