import { useState } from 'react';
import Countdown from 'react-countdown';

const Clock = () => {

    const [time, setTime] = useState(10 * 1000);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            window.electron.ipcRenderer.send('flash-frame-open');
            return <span>恭喜你完成专注计划，太棒了</span>;
        } else {
            return <span>{hours}:{minutes}:{seconds}</span>;
        };
    };

    return (
        <>
            <Countdown date={Date.now() + time} renderer={renderer} />
        </>
    )
};

export default Clock;