import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Character, requestCharacterByName } from "@/lib/api";

function NavigationMenu({ setCharacters }: any) {
  const [isValue, setIsValue] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    console.log(newName);
    setName(newName);
    if (name !== "") {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
  };

  const findCaracters = async (name: string) => {
    setCharacters(await requestCharacterByName(name));
  };

  useEffect(() => {
    if (isValue) {
      findCaracters(name);
    }
  }, [name]);

  return (
    <nav className="flex items-center list-none bg-lime-950 rounded p-1">
      <div className="grid grid-cols-3 gap-96 my-1 w-screen">
        <div>
          <Button variant={"outline"} className=" w-25 mx-5">
            <HomeIcon className="mr-2 h-4 w-4" /> Home
          </Button>
        </div>
        <div className="flex justify-center w-full">
          <div className="relative w-screen">
            <Input
              onInput={handleInputChange}
              type="text"
              placeholder="Search"
              className="pl-5 w-full"
            />
            <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-2" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
