import React from 'react'

const Meeting = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      Meeting Id: #{params.id}
    </div>
  )
}

export default Meeting
