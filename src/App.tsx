import { useState, useEffect } from 'react'
import './App.css'
import TimerButtons from './TimerButtons/TimerButtons';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import Select from 'react-select';
import alarmClock from '../src/assets/alarmclock.png'
import alarmClockSound from '../src/assets/alarmClockSound.mp3';

function App() {

  // dropdown options
  const options = [
    {value: 1, label:"1 Minute"},
    {value:5, label:"5 Minutes"},
    {value:10, label:"10 Minutes"},
    {value:15, label:"15 Minutes"},
    {value:20, label:"20 Minutes"},
    {value:25, label:"25 Minutes"},
    {value:30, label:"30 Minutes"},
    {value:35, label:"35 Minutes"},
    {value:40, label:"40 Minutes"},
    {value:45, label:"45 Minutes"},
    {value:50, label:"50 Minutes"},
    {value:55, label:"55 Minutes"},
    {value:60, label:"60 Minutes"},
];


const [status, setStatus] = useState('Work');

const [workMinutes, setWorkMinutes] = useState<number>(0);
const [breakMinutes, setBreakMinutes] = useState<number>(0);

const [workTimeLeft, setWorkTimeLeft] = useState<number>(0);
const [breakTimeLeft, setBreakTimeLeft] = useState<number>(0);

const [workIsRunning, setWorkIsRunning] = useState(false);
const [breakIsRunning, setBreakIsRunning] = useState(false);

const [timeDisplay, setTimeDisplay] = useState('');


/* eslint-disable @typescript-eslint/no-explicit-any */
const setTimer = (option: any) => {
  if (status == 'Work') {
    setWorkMinutes(option.value);
    setWorkTimeLeft(option.value * 60);
  }
  else {
    setBreakMinutes(option.value);
    setBreakTimeLeft(option.value * 60);
  }
}



// work
useEffect(() => {
  if (!workIsRunning || workTimeLeft <= 0) return;

  const timer = setInterval(() => {
    setWorkTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [workIsRunning, workTimeLeft]);

const startWorkTimer = () => {
  // setWorkTimeLeft(workMinutes * 60);
  setWorkIsRunning(true);
};

const pauseWorkTimer = () => {
  setWorkIsRunning(false);
}

const resetWorkTimer = () => {
  setWorkTimeLeft(workMinutes * 60);
}



// break
useEffect(() => {
  if (!breakIsRunning || breakTimeLeft <= 0) return;

  const timer = setInterval(() => {
    setBreakTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [breakIsRunning, breakTimeLeft]);

const startBreakTimer = () => {
  // setBreakTimeLeft(workMinutes * 60);
  setBreakIsRunning(true);
};

const pauseBreakTimer = () => {
  setBreakIsRunning(false);
  
}

const resetBreakTimer = () => {
  setBreakTimeLeft(breakMinutes * 60);
}


const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  setTimeDisplay(`${m}:${s}`);
  return timeDisplay;
};


// notifications
useEffect(() => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}, []);

const sendNotification = (status: string) => {
  if (Notification.permission == 'granted') {
    new Notification(`${status} time's up!`, {
      body: `Your ${status} timer has finished.`,
      icon: alarmClock
    });

    const audio = new Audio(alarmClockSound);
    audio.loop = false;
    audio.play();
  }
}

if (workIsRunning && workTimeLeft == 0) {
  sendNotification('Work');
}

if (breakIsRunning && breakTimeLeft == 0) {
  sendNotification('Break');
}


  return (
    <>
      <div className={`flex flex-col gap-6 items-center ${status == 'Work' ? 'workBackground' : 'breakBackground'} h-full p-10 md:p-20`}>
        <div className="glitch-wrapper">
          <div className="glitch" data-glitch={`${status == 'Work' ? 'Work' : 'Break'}`}>{status}</div>
        </div>
        <div className="flex gap-6">
          <button onClick={() => setStatus('Work')}>Work</button>
          <button onClick={() => setStatus('Break')}>Break</button>
        </div>
        <Select options={options} onChange={(option) => setTimer(option)} className="w-full md:w-1/2 text-black" />
        <TimerDisplay status={status} formatTime={formatTime} workTimeLeft={workTimeLeft} breakTimeLeft={breakTimeLeft} workIsRunning={workIsRunning} breakIsRunning={breakIsRunning} resetWorkTimer={resetWorkTimer} />
        <TimerButtons status={status} startWorkTimer={startWorkTimer} startBreakTimer={startBreakTimer} pauseWorkTimer={pauseWorkTimer} pauseBreakTimer={pauseBreakTimer} resetWorkTimer={resetWorkTimer} resetBreakTimer={resetBreakTimer} />
        <div className="flex flex-col absolute bottom-5 left-5 timerDisplay p-3">
          Work: {workMinutes} Minutes<br />
          Break: {breakMinutes} Minutes<br />
        </div>
      </div>
    </>
  )
}

export default App
