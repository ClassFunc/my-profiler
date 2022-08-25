import {memo, useEffect, useRef, useState} from 'react';

export default function Home() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [intervalStop, setIntervalStop] = useState(false);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (intervalStop) {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {setCount(c => ++c);}, 1000);
        return () => clearInterval(intervalRef.current);
    }, [intervalStop]);

    return (
        <div
            className={'flex justify-center flex-col items-center gap-4 pt-10 m-10 p-2'}>
            <Header name={'Home'}/>
            <div className={'flex flex-row gap-3'}>
                <input type="text" className={`border p-2`}
                       value={name}
                       onChange={e => setName(e.target.value)}/>
                <div className={`accent-red-700 font-bold text-4xl`}>
                    {count}
                </div>
                <button className={` p-2 bg-red-300 rounded-lg`}
                        onClick={() => setIntervalStop(val => !val)}>
                    {intervalStop ? 'Start' : 'Stop'}
                </button>
            </div>
            <Greeting
                name={name}
                // parentCount={count}
            />

            <LongList counter={count}
            />
        </div>
    );
}

// eslint-disable-next-line react/display-name
const Greeting =
    memo(
        function Greeting({name}) {
            useEffect(() => {
                console.log('Greeting mount');
            }, []);
            console.log('Greeting re-render');
            return (
                <div className={`p-3 `}>
                    <Header name={'Greeting'}/>
                    Hello
                    <span className={'font-bold text-violet-800'}> {name}</span>
                </div>
            );
        },
    );

const LongList =
    memo(
        function LongList({counter}) {
            console.log('LongList re-render');
            const numbers = [...Array(counter).keys()].map(k => k + 1);
            return (
                <div className={'m-3'}>
                    <Header name={'LongList'}/>
                    <div className={'flex flex-wrap gap-2'}>
                        {numbers.map(n => <div key={n}>{n}</div>)}
                    </div>
                </div>
            );
        },
    );

const Header =
    memo(
        function Header({name}) {
            return (
                <div className={`flex justify-center`}>
                    <pre className={`text-blue-800`}>- {name} -</pre>
                </div>
            );
        },
    );
