import './App.css'
import GameBoard from "./components/GameBoard"
import { useState } from "react"

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

import undo from "./assets/undo.png"
import swap from "./assets/swap.png"


function App() {

  const [activePlayer, setActivePlayer] = useState<number>(1);
  
  const [playerRole, setPlayerRole] = useState<number>(1);

  return (
    <>
      <Drawer>
        <div className="h-screen w-screen flex flex-col justify-start items-center relative">
          <div id="turn-tracker" className={playerRole == 1 ? "fixed top-[4%] font-bold text-lg text-black" : "fixed top-[4%] font-bold text-lg"}>Your Turn</div>
          <DrawerTrigger className="fixed bottom-[4%]">
            <Button variant="default" className="cursor-pointer">Power-ups</Button>
          </DrawerTrigger>
          <div className={(playerRole == 2) ? "grow h-full w-full flex justify-center items-center bg-stone-900" : "grow h-full w-full flex justify-center items-center bg-stone-100"}><GameBoard playerRole={playerRole} setPlayerRole={setPlayerRole} activePlayer={activePlayer} setActivePlayer={setActivePlayer}/></div>
        </div>
        <DrawerContent className="flex flex-col bg-stone-600 h-[450px] justify-center items-center">
          <DrawerHeader className="flex w-[20%]">
            <DrawerTitle className="flex justify-center items-center text-2xl font-bold">Choose an ability.</DrawerTitle>
            <DrawerDescription className="flex justify-center items-center">This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <Carousel className="grow aspect-square max-h-[220px]">
              <CarouselContent className="h-full">
                <CarouselItem>
                  <img src={swap} className="h-full object-contain"/>
                </CarouselItem>
                <CarouselItem>
                  <img src={undo} className="h-full object-contain"/>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          <DrawerFooter className="w-[20%]">
            <Button variant="default" className="cursor-pointer">Select</Button>
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
