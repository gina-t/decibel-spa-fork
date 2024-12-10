import AlbumHeader from "../components/AlbumHeader";
import AlbumSearch from "../components/AlbumSearch";

function AlbumSearchPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <AlbumHeader />
      <AlbumSearch />
    </div>
  );
}

export default AlbumSearchPage;
