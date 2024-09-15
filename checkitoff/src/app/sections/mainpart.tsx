import Navbar from './navbar'
import Today from './today'
import Upcoming from './upcoming'

function MainPart(){

    return(
        <div className="">
            <Navbar />
            
            <div className='w-[96%] m-auto pt-12 md:pt-24'>
                <div className='flex justify-between items-start flex-col md:flex-row'>
                    <Today/>
                    <Upcoming/>
                </div>
            </div>

            
        </div>
    )
}

export default MainPart;