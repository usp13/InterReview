import React from 'react' ; 
import { buildStyles, CircularProgressbar} from 'react-circular-progressbar'  ;
import 'react-circular-progressbar/dist/styles.css'

function Timer( { timeLeft , totalTime }) {


  //console.log("Timer:", { timeLeft, totalTime });

  const safeTimeLeft = Number.isFinite(timeLeft) ? timeLeft : 0;
  
  const safeTotalTime = Number.isFinite(totalTime) && totalTime > 0 ? totalTime : 60;

  const percentage = (safeTimeLeft / safeTotalTime) * 100;
    //
    // const percentage  = ( timeLeft / totalTime )*100 ; 

  return (
    <div
    className='w-20 h-20'>
     <CircularProgressbar
     value={percentage}
     text={`${timeLeft}s`}
     styles={ buildStyles ({
        textSize: '28px',
        pathColor: '#10b999',
        textColor: '#ef4444',
        trailColor: '#e5e7eb'
     })}
     />
    </div>
  )
}

export default Timer ; 