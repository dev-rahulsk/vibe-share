import { Button } from '@nextui-org/react';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button variant='solid' onClick={async () => {
      await call.endCall();
      router.push('/');
    }} className=' bg-red-500 text-white'>
      End Call For Everyone
    </Button>
  )
}

export default EndCallButton
