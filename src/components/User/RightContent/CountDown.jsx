import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function CountDown(props) {
    const [count, setCount] = useState(7200);
    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return
        };
        const timer = setInterval(() => {
            setCount(count - 1);
            // console.log('run me');
        }, 1000)
        return () => {
            clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    return (
        <div className='count-down-container'>{toHHMMSS(count)}</div>
    )
}
