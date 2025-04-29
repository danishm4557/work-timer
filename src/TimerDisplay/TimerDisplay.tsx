type Props = {
    status: string;
    workTimeLeft: number;
    breakTimeLeft: number;
    formatTime: (time: number) => string;
    workIsRunning: boolean;
    breakIsRunning: boolean;
    resetWorkTimer: () => void;
}

const TimerDisplay = ({status, workTimeLeft, breakTimeLeft, formatTime, workIsRunning, breakIsRunning, resetWorkTimer}: Props) => {
  return (
    <>
        <div className="timerDisplay w-full md:w-1/2 h-52 flex justify-center items-center rounded-2xl">
            {/* {
                status == 'Work' ? <div className="text-7xl">{formatTime(workTimeLeft)}</div> : <div className="text-7xl">{formatTime(breakTimeLeft)}</div>
            } */}
            {
              status == 'Work' ? (workIsRunning == true && workTimeLeft == 0) ? 
              <div className="timerCompleteMessage">
                <h2 className="text-4xl">🎉 Work time's up!</h2>
                <p className="text-xl pt-3">You can start again or take a break.</p>
                <button className="mt-5" onClick={() => resetWorkTimer()}>Restart</button>
              </div> : <div className="text-7xl">{formatTime(workTimeLeft)}</div> : (breakIsRunning == true && breakTimeLeft == 0) ? <div className="timerCompleteMessage">
                <h2 className="text-4xl">🎉 Break time's up!</h2>
                <p className="text-xl pt-3">Let's get back to work.</p>
              </div> : <div className="text-7xl">{formatTime(breakTimeLeft)}</div>
            }
        </div>
    </>
  )
}

export default TimerDisplay