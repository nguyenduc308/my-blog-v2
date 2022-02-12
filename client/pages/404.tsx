import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <h1>NOT FOUND</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  );
};

export default NotFound;
