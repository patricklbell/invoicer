const ErrorPage = () => {
  return (
    <section className="flex items-center h-[100vh] p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&lsquo;t find this page.
          </p>
          <p className="mt-4 mb-8">
            But don&lsquo;t worry, you can find plenty of other things on our
            homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold rounded text-primary hover:text-primary-100"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
