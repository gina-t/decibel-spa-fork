import { useState, useEffect } from "react";
import { AlbumDataType } from "../interfaces/AlbumDataType";

// @ts-ignore
export default function AlbumTable({ albumData }) {
  const [searchedAlbums, setSearchedAlbums] = useState<AlbumDataType[]>([]);
  const [savedAlbumKeys, setSavedAlbumKeys] = useState<string[]>([]); // Track saved album keys

  // Fetch saved albums from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("savedAlbums");
    if (savedData) {
      const savedAlbums: AlbumDataType[] = JSON.parse(savedData);
      const savedKeys = savedAlbums.map((album) => album.album_key);
      setSavedAlbumKeys(savedKeys);
    }
  }, []);

  // Update the album search table if the user searches for something new
  useEffect(() => {
    if (Array.isArray(albumData) && albumData.length > 0) {
      const transformedAlbumData: AlbumDataType[] = albumData.map((album) => ({
        album_key: album.id,
        album_artist: album.artists[0].name,
        album_name: album.name,
        release_date: album.release_date,
        album_img: album.images[1]?.url || "", // Ensure a fallback if no image is present
        album_spotify_url: album.external_urls.spotify,
        artist_spotify_url: album.artists[0].external_urls.spotify,
      }));
      setSearchedAlbums(transformedAlbumData);
    }
  }, [albumData]);

  const saveAlbumToLocalStorage = (album: AlbumDataType) => {
    try {
      // Retrieve existing saved albums from local storage or initialize an empty array
      const existingAlbums: AlbumDataType[] = JSON.parse(
        localStorage.getItem("savedAlbums") || "[]"
      );

      // Check if the album already exists in the saved albums based on the unique album_key
      const isDuplicate = existingAlbums.some(
        (savedAlbum) => savedAlbum.album_key === album.album_key
      );

      if (isDuplicate) {
        alert(
          `Album "${album.album_name}" by ${album.album_artist} is already saved!`
        );
        return; // Exit the function early if it's a duplicate
      }

      // Add the new album to the array
      const updatedAlbums = [...existingAlbums, album];

      // Save the updated array back to local storage
      localStorage.setItem("savedAlbums", JSON.stringify(updatedAlbums));

      // Update the saved album keys state
      setSavedAlbumKeys((prevKeys) => [...prevKeys, album.album_key]);

      // alert(`Album "${album.album_name}" by ${album.album_artist} added successfully!`);
    } catch (error) {
      console.error("Error saving album to local storage:", error);
      alert("Failed to save album. Check console for details.");
    }
  };

  const removeAlbumFromLocalStorage = (albumKey: string) => {
    try {
      // Retrieve existing saved albums from local storage or initialize an empty array
      const existingAlbums: AlbumDataType[] = JSON.parse(
        localStorage.getItem("savedAlbums") || "[]"
      );

      // Filter out the album with the given key
      const updatedAlbums = existingAlbums.filter(
        (savedAlbum) => savedAlbum.album_key !== albumKey
      );

      // Save the updated array back to local storage
      localStorage.setItem("savedAlbums", JSON.stringify(updatedAlbums));

      // Update the saved album keys state
      setSavedAlbumKeys((prevKeys) =>
        prevKeys.filter((key) => key !== albumKey)
      );

      // alert(`Album with key "${albumKey}" has been removed successfully!`);
    } catch (error) {
      console.error("Error removing album from local storage:", error);
      alert("Failed to remove album. Check console for details.");
    }
  };

  return (
    <>
      {searchedAlbums.length === 0 ? (
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
                    className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                  >
                    Release Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                  >
                    Add to favourites
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {searchedAlbums.map((element) => (
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
                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-300">
                      {element.release_date}
                    </td>
                    <td className="relative whitespace-nowrap px-3 py-3.5 text-center text-sm font-medium">
                      {savedAlbumKeys.includes(element.album_key) ? (
                        <button
                          onClick={() =>
                            removeAlbumFromLocalStorage(element.album_key)
                          }
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          <div className="group flex items-center justify-center">
                            <svg
                              viewBox="0 0 576 512"
                              className="fill-current text-indigo-500 group-hover:text-indigo-300 transition-colors duration-300"
                              height="24px"
                              fill="#6366F1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M352.4 243.8l-49.83 99.5c-6.009 12-23.41 11.62-28.92-.625L216.7 216.3l-30.05 71.75L88.55 288l176.4 182.2c12.66 13.07 33.36 13.07 46.03 0l176.4-182.2l-112.1 .0052L352.4 243.8zM495.2 62.86c-54.36-46.98-137.5-38.5-187.5 13.06L288 96.25L268.3 75.92C218.3 24.36 135.2 15.88 80.81 62.86C23.37 112.5 16.84 197.6 60.18 256h105l35.93-86.25c5.508-12.88 23.66-13.12 29.54-.375l58.21 129.4l49.07-98c5.884-11.75 22.78-11.75 28.67 0l27.67 55.25h121.5C559.2 197.6 552.6 112.5 495.2 62.86z" />
                            </svg>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => saveAlbumToLocalStorage(element)}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          <div className="group">
                            <svg
                              className="fill-current text-indigo-500 group-hover:text-indigo-300 transition-colors duration-300"
                              enableBackground="new 0 0 24 24"
                              height="24px"
                              id="Layer_1"
                              version="1.1"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#6366F1"
                              xmlSpace="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <path d="M22,4.6c-2.6-2.6-6.8-2.6-9.4,0c-0.2,0.2-0.5,0.5-0.7,0.8c-0.2-0.3-0.4-0.5-0.7-0.8C8.7,2,4.5,2,2,4.6  c-2.6,2.6-2.6,6.8,0,9.4l8.7,8.7L12,24l1.3-1.3L22,14C24.6,11.4,24.6,7.2,22,4.6z M12,21.7c0,0-8.1-8.7-8.7-8.7h5.2l1.5-2.5l4,5.4  l2-2.9h4.7C20.1,13,12,21.7,12,21.7z M21.4,12h-5.9L14,14.1l-4-5.2L8,12H2.6c-1.1-2-0.8-4.3,0.7-5.9C5.1,4.3,8.1,4.2,10,6  c0.4,0.4,2,2,2,2s1.6-1.6,2-2c1.8-1.8,4.8-1.7,6.7,0.2C22.3,7.7,22.5,10,21.4,12z" />
                            </svg>
                          </div>
                        </button>
                      )}
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
}
