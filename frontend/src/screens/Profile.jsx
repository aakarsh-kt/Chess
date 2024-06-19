import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [date, setDate] = useState(null);

    useEffect(() => {   
        if (user) {
            const date = user.createdAt.toDate();
            console.log(date);
            setGamesWon(user.games.filter((game) => game.winner === 'Win').length);
            setDate(date);
        }
    }, [user]);
    const [gamesWon, setGamesWon] = useState(0);
   
    
    return (
        <div className='flex flex-col h-screen'>
            <div className=''><Navbar/></div>
            <div className=" h-full bg-gray-600 flex flex-col items-center py-10 w-screen">
                <div className="flex flex-row items-center justify-between gap-10">
                    <div className="items-center justify-between ">
                        <div className="bg-blue-200 shadow-lg rounded-lg p-6 w-full flex flex-col  items-center mr-20 ">
                            <img
                                src={user?.profilePicture}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mb-4"
                            />
                            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            {date !== null && (
                                <p className="text-gray-500 mt-2">Joined: {format(date, 'PPP')}</p>
                            )}
                            </div>
                            <div className='bg-blue-200 shadow-lg rounded-lg p-6 w-full flex flex-col mt-10  items-center mr-20 '>
                                <h1>Total Games Played: {user?.games.length}</h1>
                                <h1>Games Won: {gamesWon}</h1>
                                <h1>Games Lost: {user?.games.length-gamesWon}</h1>
                        </div>
                    </div>
                    <div className="w-full ">
                        <h2 className="text-2xl font-semibold mb-4 text-white ">Games Played</h2>
                        <div className="flex flex-col gap-4  overflow-hidden hover:overflow-y-scroll   w-72  max-h-[470px]">
                            {user?.games.map((game) => (
                                <div
                                    key={game.id}
                                    className={`shadow-lg rounded-lg p-4 ${game.winner === 'Loss' ? 'bg-red-200' : 'bg-green-400'}`}
                                >
                                    <div className="flex flex-col">
                                        <p className="text-lg font-medium">v/s: {game?.player2}</p>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">Result: {game?.winner}</p>
                                            <p className="text-gray-500">{format(game?.startTime.toDate(), 'Pp')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
