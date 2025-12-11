
import { useSearchParams } from 'react-router';
import Gallery from '../../components/gallery/Gallery';

const SearchPage = () => {
  const [serachParams ] = useSearchParams()
  const boardId =  serachParams.get('boardId')
  const search = serachParams.get('search')
  console.log(search);
  return (
    <div>
      <Gallery search ={search} boardId={boardId} />
    </div>
  );
}

export default SearchPage;
