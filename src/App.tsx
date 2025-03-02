import './App.css'
import GameBoard from "./components/GameBoard"
import { useEffect, useState } from "react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import hint from "./assets/hint.png"
import swap from "./assets/swap.png"


function App() {

  const powerUpList = [[swap, false], [hint, false]]

  const [activePlayer, setActivePlayer] = useState<number>(1);
  
  const [playerRole, setPlayerRole] = useState<number>(1);

  const [powerUps, setPowerUps] = useState<Array<Array<string | boolean>>>(powerUpList);

  const [powerUpIndex, setPowerUpIndex] = useState<number>(0);

  const [useHint, setUseHint] = useState<boolean>(false);

  useEffect(() => {
    setPowerUps(powerUpList);
    setUseHint(false);
  }, [])

  const handleUsePowerUp = (index: number) => {
    if (powerUps[index][0] == swap) {
      console.log("Selected: Swap!")
      setPlayerRole(2);
      setActivePlayer(1);
    } else if (powerUps[index][0] == hint) {
      console.log("Selected: Hint!")
      setUseHint(true);
    }
    powerUps[index][1] = true;
    setPowerUps(powerUps)
  }

  return (
    <>
      <Drawer>
        <div className="h-screen w-screen flex flex-col justify-start items-center relative">
          <div id="turn-tracker" className={playerRole == 1 ? "fixed top-[4%] font-bold text-lg text-black" : "fixed top-[4%] font-bold text-lg"}>Your Turn</div>
          <DrawerTrigger className="fixed bottom-[4%]">
            <Button variant="default" className="cursor-pointer">Power-ups</Button>
          </DrawerTrigger>
          <div className={(playerRole == 2) ? "grow h-full w-full flex justify-center items-center bg-stone-900" : "grow h-full w-full flex justify-center items-center bg-stone-100"}><GameBoard playerRole={playerRole} setPlayerRole={setPlayerRole} activePlayer={activePlayer} setActivePlayer={setActivePlayer} setPowerUpIndex={setPowerUpIndex} setPowerUps={setPowerUps} originalPowerUpList={powerUpList} useHint={useHint} setUseHint={setUseHint}/></div>
        </div>
        <DrawerContent className="flex flex-col bg-stone-600 h-[450px] justify-center items-center">
          <DrawerHeader className="flex w-[20%]">
            <DrawerTitle className="flex justify-center items-center text-2xl font-bold">Choose an ability.</DrawerTitle>
            <DrawerDescription className="flex justify-center items-center">This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <Carousel className="grow aspect-square max-h-[220px]" setPowerUpIndex={setPowerUpIndex} powerUpIndex={powerUpIndex} powerUpsListLength={powerUps.length}>
              <CarouselContent className="h-full">
                {powerUps.map(arr => 
                  <CarouselItem>
                  <img src={arr[0] as string} className="h-full object-contain"/>
                </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          <DrawerFooter className="w-[20%]">
            <DrawerClose>
              <Button variant="default" className="w-full cursor-pointer" disabled={powerUps[powerUpIndex][1] as boolean} onClick={() => handleUsePowerUp(powerUpIndex)}>Select</Button>
            </DrawerClose>
            <DrawerClose>
              <Button variant="outline" className="w-full cursor-pointer">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default App
