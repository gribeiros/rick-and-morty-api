import axios from "axios";


const request = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
})



export interface Character {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
}

interface Origin {
    name: string
    url: string
}

interface Location {
    name: string
    url: string
}


export async function requestCharacters(): Promise<Character[]> {

    try {
        const [rickResponse, mortyResponse] = await Promise.all([
            request.get('/character/?name=rick'),
            request.get('/character/?name=morty')
        ]);

        const rickCharacters: Character[] = rickResponse.data.results;
        const mortyCharacters: Character[] = mortyResponse.data.results;

        const combinedCharacters: Character[] = [...rickCharacters, ...mortyCharacters];

        await new Promise((resolve) => setTimeout(resolve, 3000))
        return combinedCharacters;
    } catch (err) {
        console.error("Error fetching characters:", err);
        if (axios.isAxiosError(err)) {
            throw err;
        } else {
            throw new Error(`Unexpected error occurred while fetching characters:\n${err}`);
        }
    }
}