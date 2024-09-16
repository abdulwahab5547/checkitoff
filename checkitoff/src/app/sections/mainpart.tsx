import Navbar from './navbar'
import Today from './today'
import Upcoming from './upcoming'
import React, { useRef } from 'react';

function MainPart(){
    const todayRef = useRef<{ refreshToday: () => void }>(null);
    const upcomingRef = useRef<{ refreshUpcoming: () => void }>(null);
  
    const refresh = () => {
      if (todayRef.current) todayRef.current.refreshToday();
      if (upcomingRef.current) upcomingRef.current.refreshUpcoming();
    };
    return(
        <div className="">
            <Navbar refresh={refresh}/>
            
            <div className='w-[96%] m-auto pt-12 md:pt-24'>
                <div className='flex justify-between items-start flex-col md:flex-row'>
                    <Today ref={todayRef} />
                    <Upcoming ref={upcomingRef} />
                </div>
            </div>

            
        </div>
    )
}

export default MainPart;