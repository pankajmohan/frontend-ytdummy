import React from 'react'
import SubButton from '../SubButton'
import { MdEdit  } from 'react-icons/md';

function UserChannelData({user}) {
  return (
    <div className="flex flex-wrap gap-4 pb-4 pt-6 border-b border-b-white">
          <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
            <img src={user.data.user.avatar} alt="Channel" className="h-full w-full" />
          </span>
          <div className="mr-auto inline-block">
            <h1 className="font-bolg text-xl">
              {user.data.user.fullName}
            </h1>
            <p className="text-sm text-gray-400">@{user.data.user.username}</p>
            <p className="text-sm text-gray-400">600k Subscribers&nbsp;·&nbsp;220 Subscribed</p>
          </div>
          <div className="inline-block">
            <div className="inline-flex min-w-[145px] justify-end">
              <SubButton className="" icon={<MdEdit />} label={"Edit"}/>
              
            </div>
          </div>
        </div>
  )
}

export default UserChannelData