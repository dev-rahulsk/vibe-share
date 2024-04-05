import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type THomeCardProps = {
  icon: string,
  title: string,
  desc: string,
  className: string,
  handleClick: () => void,
}

const HomeCards = ({ icon, title, desc, className, handleClick }: THomeCardProps) => {
  return (
    <div className={cn("px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", className)} onClick={handleClick}>
      <div className="flex justify-center glassmorphism size-12 rounded-[10px]">
        <Image
          src={icon}
          width={27}
          height={27}
          alt='Home Card Icon'
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-lg font-normal'>{desc}</p>
      </div>
    </div>
  )
}

export default HomeCards
