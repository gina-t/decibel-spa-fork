import Header from "../components/Header";
import AlbumSearch from "../components/AlbumSearch";

function AlbumSearchPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header heading="Album Search" description="Keep track of your favourite albums"/>
      <AlbumSearch />
    </div>
  );
}

export default AlbumSearchPage;
