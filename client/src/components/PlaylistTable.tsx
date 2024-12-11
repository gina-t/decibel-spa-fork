import { useEffect, useState } from "react";
import { AlbumDataType } from "../interfaces/AlbumDataType";

const PlaylistTable = () => {
  const [savedAlbums, setSavedAlbums] = useState<AlbumDataType[]>([]);

  useEffect(() => {
    // Retrieve the saved albums from localStorage
    const savedData = localStorage.getItem("savedAlbums");
    if (savedData) {
      setSavedAlbums(JSON.parse(savedData));
    }
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <>
    {savedAlbums.length === 0 ? (
      <div className="bg-gray-900 text-white text-center flex items-center justify-center h-64">
        No albums found.
      </div>
    ) : (
      <div className="relative mx-4 max-h-[600px] overflow-x-auto overflow-y-auto sm:mx-6 lg:mx-8 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-900 scrollbar-thumb-rounded-full">
        {/* Scrollable Table */}
        <div className="inline-block min-w-full py-2 px-4 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                >
                  {""}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Album
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Artist
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Release Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-white"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {savedAlbums.map((element) => (
                <tr key={element.album_key}>
                  <td className="flex justify-center items-center whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                    {element.album_img ? (
                      <img
                        alt={element.album_name}
                        src={element.album_img}
                        className="w-11 h-11 rounded-full"
                      />
                    ) : (
                      <span>{""}</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <a
                      href={element.album_spotify_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {element.album_name}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <a
                      href={element.artist_spotify_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {element.album_artist}
                    </a>
                  </td>
                  <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-300">
                    {element.release_date}
                  </td>
                  <td className="relative whitespace-nowrap px-3 py-3.5 text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        alert(`"${element.album_name}" is already saved.`)
                      }
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      Saved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
      </>
  );
};

export default PlaylistTable;
