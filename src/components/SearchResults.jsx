// SearchResults.jsx

const SearchResults = ({ searchResults, openModal }) => {
  // searchResults'un varlığını kontrol et
  if (!searchResults) {
    return <div>No results found</div>;
  }

  // searchResults'un length özelliğine güvenli bir şekilde eriş
  const resultsLength = searchResults.length || 0;

  return (
    <div>
      <p>Results: {resultsLength}</p>
      {/* Diğer işlemler */}
    </div>
  );
};

export default SearchResults;
