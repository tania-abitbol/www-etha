import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { url } = context.query;

  if (typeof url === "string" && url.startsWith("bae:///")) {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

const RedirectPage = () => {
  return null;
};

export default RedirectPage;
