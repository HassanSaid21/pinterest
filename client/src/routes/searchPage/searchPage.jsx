import React from 'react';
import { useSearchParams } from 'react-router';
import Gallery from '../../components/gallery/Gallery';

const SearchPage = () => {
  const [serachParams ] = useSearchParams()
  const search = serachParams.get('search')
  console.log(search);
  return (
    <div>
      <Gallery search ={search} />
    </div>
  );
}

export default SearchPage;
