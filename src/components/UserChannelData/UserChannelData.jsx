import React, { useState, useEffect } from 'react'
import SubButton from '../SubButton'
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import api from '../../api/axios';

function UserChannelData({ user, setOpen, setUser }) {
  const navigate = useNavigate();
  const width = 'w_150';
  const height = 'h_150';
  const avatar = user?.avatar.replace('/upload', `/upload/${width},${height},c_thumb,g_face,r_max`);
  const isOwnChannel = user?.isOwnChannel;
  const isSubscribed = user?.isSubscribed;;

  const subscribeUser = async () => {
    const response = await api.get(`/subscription/subscribe-user/${user._id}`);
    if (response.data.success) {
      setUser((prev) => ({
        ...prev,
        isSubscribed: true,
        subscribersCount: prev.subscribersCount + 1
      }))
    }
  }
  const unSubscribeUser = async () => {
    const response = await api.get(`/subscription/unsubscribe-user/${user._id}`);
    if (response.data.success) {
      setUser((prev) => ({
        ...prev,
        isSubscribed: false,
        subscribersCount: Math.max(prev.subscribersCount - 1, 0)
      }))
    }
  }

  return (
    <div className="flex flex-wrap gap-4 pb-4 pt-6 border-b border-b-white">
      <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
        <img src={avatar} alt="Channel" className="h-full w-full" />
      </span>
      <div className="mr-auto inline-block">
        <h1 className="font-bolg text-xl">
          {user.fullName}
        </h1>
        <p className="text-sm text-gray-400">@{user.username}</p>
        <p className="text-sm text-gray-400">{user.subscribersCount} Subscribers&nbsp;·&nbsp;{user.channelsSubscribedToCount} Subscribed</p>
      </div>
      <div className="inline-block">
        <div className="flex min-w-[145px] justify-between gap-2">
          {isOwnChannel
            ?
            <>
              <Button onClick={() => setOpen(true)}> + New Video</Button>
              <SubButton className="" icon={<MdEdit />} label={"Edit"} onClick={() => navigate("/edit-user")} />
            </>
            :
            (isSubscribed ? <SubButton className="shadow-lg border border-red-500 " bgColor={"bg-red-500"} hoverbgColor = 'hover:bg-red-900' label={"Unsubscribe"} onClick={() => unSubscribeUser()} />
              : <SubButton className="" label={"Subscribe"} onClick={() => subscribeUser()} />
            )

          }

        </div>
      </div>
    </div>
  )
}

export default UserChannelData