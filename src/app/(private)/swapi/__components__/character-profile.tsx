"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSWCharacter } from "@/lib/http/queries/swapi/character/get-character";
import { HeightIcon } from "@radix-ui/react-icons";
import {
  Contact,
  Earth,
  HardHatIcon,
  PaintRoller,
  Share,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import CharacterDetail from "./character-detail";

const CharacterProfile = () => {
  const { data: character, isLoading, isError } = useSWCharacter();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError || !character) {
    return <div>Erro ao carregar personagem</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="col-span-2">
        <CardHeader className="relative">
          <CardTitle>{character.name}</CardTitle>
          <CardDescription>
            Start the journey - {character.birth_year}
          </CardDescription>
          <Button
            title="Compartilhar"
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2"
          >
            <Share className="w-4 h-4" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="py-5 flex flex-col gap-2">
          <CharacterDetail title={character.gender} icon={Contact} />
          <CharacterDetail title={character.eye_color} icon={UserRound} />
          <CharacterDetail title={character.hair_color} icon={PaintRoller} />
          <CharacterDetail title={character.skin_color} icon={HardHatIcon} />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="flex justify-center items-center relative">
          <CardTitle className="3xl">Altura</CardTitle>
          <HeightIcon className="absolute top-2 right-2" />
        </CardHeader>
        <Separator />
        <CardContent className="justify-center items-center flex flex-col py-5">
          <CardDescription className="text-6xl text-center text-muted-foreground">
            {character.height} cm
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="flex justify-center items-center relative">
          <CardTitle className="3xl">Peso</CardTitle>
          <HeightIcon className="absolute top-2 right-2" />
        </CardHeader>
        <Separator />
        <CardContent className="justify-center items-center flex flex-col py-5">
          <CardDescription className="text-6xl text-center text-muted-foreground">
            {character.mass}kg
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="flex justify-center items-center relative">
          <CardTitle className="3xl">Mundo de Origem</CardTitle>
          <Earth className="absolute top-2 right-2" />
        </CardHeader>
        <Separator />
        <CardContent className="justify-center items-center flex flex-col py-5">
          <span>
            Quer saber de onde veio ?{" "}
            <Link href={character.homeworld ?? ""}>Clique aqui</Link>
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterProfile;
