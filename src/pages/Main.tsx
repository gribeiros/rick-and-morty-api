import { useState, useEffect, Suspense } from "react";
import { Character, requestCharacters } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { StatusCharacter } from "@/components/ui/status";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Loading } from "@/components/ui/loading";

function Main() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getCharacters = async () => {
    try {
      setCharacters(await requestCharacters());
    } catch (error) {
      setError("Your session has expired. Please log in again.");
      console.error(error);
    } finally {
      setLoading(false); // Marca o carregamento como concluído, mesmo em caso de erro
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-screen">
          <Alert
            variant="destructive"
            className="bg-red-100 w-96 p-4 space-x-6"
          >
            <ExclamationTriangleIcon className="h-10 w-10 mx-auto mb-2 text-red-500" />
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 m-8">
          {characters.map((c, i) => (
            <Card key={i} className="bg-[#C1F2B0] text-lime-900">
              <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-xl mb-3">{c.name}</CardTitle>
                <CardDescription>
                  <span className="flex items-center mb-2">
                    <StatusCharacter status={c.status} />
                    <span className="ml-1 text-xl">{c.status}</span>
                  </span>
                  <img src={c.image} alt={c.name} />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col text-lg">
                <span>
                  <strong className="mr-1">Localização:</strong>
                  {c.location.name}
                </span>
                <span>
                  <strong className="mr-1">Origem:</strong>
                  {c.origin.name}
                </span>
                <span>
                  <strong className="mr-1">Sexo:</strong>
                  {c.gender}
                </span>
                <span>
                  <strong className="mr-1">Especie:</strong>
                  {c.species}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Suspense>
  );
}

export default Main;
