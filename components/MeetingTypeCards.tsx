'use client'
import React, { useState } from 'react'
import HomeCards from './HomeCards'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';

const MeetingTypeCards = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

  const createMeeting = () => {
    
  }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCards
        icon="/icons/add-meeting.svg"
        title="New Meeting"
        desc="Start an instant meeting"
        className='bg-orange-1'
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCards
        icon="/icons/schedule.svg"
        title="Schedule Meeting"
        desc="Plan your Meeting"
        className='bg-blue-1'
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCards
        icon="/icons/recordings.svg"
        title="View Recordings"
        desc="Checkout your recordings"
        className='bg-purple-1'
        handleClick={() => router.push('/recordings')}
      />
      <HomeCards
        icon="/icons/join-meeting.svg"
        title="Join Meeting"
        desc="Via invitation link"
        className='bg-yellow-1'
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeCards
