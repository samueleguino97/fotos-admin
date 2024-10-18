import { useEffect, useState } from "react";
import PocketBase from "pocketbase";

function App() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [guests, setGuests] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const pb = new PocketBase("https://api.studiospulse.com");
      pb.collection("photos")
        .getFullList()
        .then((res) => {
          setGuests(res);
        });
    })();
  }, []);

  /* Download an img */
  return (
    <div className="w-full h-screen p-4">
      <h1
        className="text-lg text-gray-800"
        style={{ fontFamily: "sans-serif" }}
      >
        Las fotos de tus invitados! xd
      </h1>
      <div className="flex flex-col gap-4 p-8">
        {guests?.map((g) => (
          <div className="bg-white flex flex-col  gap-4 rounded-lg shadow-md py-4 px-6">
            <h2 className="text-sm text-gray-600 ">{g.name}</h2>
            <div className="flex flex-row gap-4">
              {/* eslint-disable @typescript-eslint/no-explicit-any */}
              {g.photos?.map((ph: any) => (
                <a
                  href={`https://api.studiospulse.com/api/files/photos/${g.id}/${ph}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://api.studiospulse.com/api/files/photos/${g.id}/${ph}`}
                    alt={`https://api.studiospulse.com/api/files/photos/${g.id}/${ph}`}
                    className=" aspect-square  h-24 object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
