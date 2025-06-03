import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import moment from 'moment';

function Subscribers({ height = 'auto' }) {
  const [subscribers, setSubscriber] = useState([]);
  const sidebarWidth = useSelector((state) => state.sidebar.width);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { userId } = useParams();
  const user = useSelector(state => state.auth.userData);
const navigate = useNavigate() 
  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const useridentity = userId === 'myself' ? user._id : userId;
        const response = await api.post('/subscription/get-subscriber', { channelId: useridentity });
        setSubscriber(response.data.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    }

    fetchSubscribers();
  }, [userId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const computedWidth = isMobile ? '100vw' : `calc(100vw - ${sidebarWidth}px)`;

  return (
    <main
      className="overflow-y-auto bg-gray-950 text-white px-4 py-6 mt-20 transition-all duration-300"
      style={{ width: computedWidth, height }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
  Subscribers
  <span className="text-gray-400 ml-2 text-base">
    ({subscribers.length})
  </span>
</h2>

        <section className="pb-20">

        {subscribers.length > 0 ? (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-700 text-sm">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-700 text-left">Avatar</th>
                      <th className="px-4 py-2 border-b border-gray-700 text-left">Full Name</th>
                      <th className="px-4 py-2 border-b border-gray-700 text-left">Username</th>
                      <th className="px-4 py-2 border-b border-gray-700 text-left">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-800">
                        <td className="px-4 py-2 border-b border-gray-700"  onClick={()=>navigate(`/my-content/${subscriber.user.username}`)}>
                          <img
                            src={subscriber.user.avatar}
                            alt="avatar"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-2 border-b border-gray-700"  onClick={()=>navigate(`/my-content/${subscriber.user.username}`)}>{subscriber.user.fullName}</td>
                        <td className="px-4 py-2 border-b border-gray-700"  onClick={()=>navigate(`/my-content/${subscriber.user.username}`)}>@{subscriber.user.username}</td>
                        <td className="px-4 py-2 border-b border-gray-700">
                          {moment(subscriber.user.createdAt).format('MMMM Do YYYY')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {subscribers.map((subscriber) => (
                  <div key={subscriber._id} className="bg-gray-800 p-4 rounded shadow" onClick={()=>navigate(`/my-content/${subscriber.user.username}`)}>
                    <div className="flex items-center space-x-4">
                      <img
                        src={subscriber.user.avatar}
                        alt="avatar"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{subscriber.user.fullName}</p>
                        <p className="text-gray-400 text-sm">@{subscriber.user.username}</p>
                        <p className="text-gray-500 text-xs">
                          Subscribed on {moment(subscriber.user.createdAt).format('MMM Do YYYY')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-center mt-8">No subscribers found or still loading.</div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Subscribers;
