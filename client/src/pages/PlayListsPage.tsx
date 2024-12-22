import Header from "../components/Header";
import PlaylistTable from "../components/PlaylistTable";

const PlayListsPage = () => {
  return (
    <div>
      <Header heading="Saved Playlists" description="Tailored to you" />
      <PlaylistTable />
    </div>
  )
}

export default PlayListsPage