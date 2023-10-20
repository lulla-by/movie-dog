import GenreSideBar from '@/components/GenreSideBar';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

function CategoryList({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [genreId] = params.params;

  return <GenreSideBar genreId={genreId} />;
}

export default CategoryList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  return {
    props: { params },
  };
};
