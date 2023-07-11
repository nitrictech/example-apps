import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()

  const handleStartNew = () => {
    router.push(`/onboarding`)
  }
  return (
    <>
      <Header />
      <main>
        <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="images/office.png"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Onboarding Application
            </h2>
            <p className="mt-3 text-xl text-white"></p>
            <p className="mt-3 text-xl text-white">
              Sign up for an account today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={handleStartNew}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
