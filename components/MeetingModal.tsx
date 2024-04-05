import React, { ReactNode } from 'react'
import { Modal, ModalContent } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import { cn } from '@/lib/utils';

type TMeetingModalProps = {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  className?: string,
  children?: ReactNode,
  buttonText?: string,
  buttonIcon?: string,
  img?: string
  handleClick?: () => void,
}

const MeetingModal = ({ isOpen, onClose, title, className, children, buttonText, buttonIcon, img, handleClick }: TMeetingModalProps) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="top-center"
      >
        <ModalContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
          <div className="flex flex-col gap-6">
            {img && (
              <div className="flex justify-center">
                <Image
                  src={img}
                  width={72}
                  height={72}
                  alt='image'
                />
              </div>
            )}
            <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
            {children}
            <Button color="primary" variant="solid" onClick={handleClick}>
              {buttonIcon && (
                <Image
                  src={buttonIcon}
                  width={13}
                  height={13}
                  alt='Button Icon'
                />
              )} &nbsp;
              {buttonText}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MeetingModal
