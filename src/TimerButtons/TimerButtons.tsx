import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBackSharp } from "react-icons/io5";





type Props = {
    status: string;
    startWorkTimer: () => void;
    startBreakTimer: () => void;
    pauseWorkTimer: () => void;
    pauseBreakTimer: () => void;
    resetWorkTimer: () => void;
    resetBreakTimer: () => void;
}

const TimerButtons = ({status, startWorkTimer, startBreakTimer, pauseWorkTimer, pauseBreakTimer, resetWorkTimer, resetBreakTimer}: Props) => {
  return (
    <>
        <div className="flex gap-3">
            {
                status == 'Work' ? <button className="flex align-middle items-center gap-2" onClick={() => startWorkTimer()}><FaPlay /> Start</button> : <button onClick={() => startBreakTimer()}>Start</button>
            }
            {
                status == 'Work' ? <button className="flex align-middle items-center gap-2" onClick={() => pauseWorkTimer()}><FaPause />Pause</button> : <button onClick={() => pauseBreakTimer()}>Pause</button>
            }
            {
                status == 'Work' ? <button className="flex align-middle items-center gap-2" onClick={() => resetWorkTimer()}><IoPlaySkipBackSharp />Reset</button> : <button onClick={() => resetBreakTimer()}>Reset</button>
            }
        </div>
    </>
  )
}

export default TimerButtons