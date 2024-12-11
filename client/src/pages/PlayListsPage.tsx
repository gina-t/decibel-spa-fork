import Header from "../components/Header";
import PlaylistTable from "../components/PlaylistTable";

const PlayListsPage = () => {
  return (
    <div>
      <Header heading="Saved Playlists" description="Test" />
      <PlaylistTable />
    </div>
  )
}

export default PlayListsPage