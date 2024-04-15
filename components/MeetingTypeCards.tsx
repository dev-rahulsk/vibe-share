'use client'
import React, { useState } from 'react'
import HomeCards from './HomeCards'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea';
import DatePicker from 'react-datepicker'
import { Input } from "@/components/ui/input"
import 'react-datepicker/dist/react-datepicker.css'


const MeetingTypeCards = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    desc: '',
    link: ''
  })
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        })
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('failed to create call')

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const desc = values.desc || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            desc
          }
        }
      })

      setCallDetails(call);

      if (!values.desc) {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: "Meeting Created",
      })
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      })
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          buttonText='Schedule Meeting'
        >
          <div className="flex flex-col gap-2.5">
            <label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
            <Textarea
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({ ...values, desc: e.target.value })
              }}
            />
            <div className="flex w-full flex-col gap-2.5">
              <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='time'
                dateFormat='MMMM d, yyyy h:mm aa'
                className='w-full rounded bg-dark-3 p-2 focus:outline-none'
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' })
          }}
          img='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copy Meeting Link'
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting Link"
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e)=>setValues({...values, link:e.target.value})}
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeCards
