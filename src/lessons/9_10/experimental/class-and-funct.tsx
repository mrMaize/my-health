import React, {forwardRef, Fragment, memo, useEffect, useState} from "react";
import './class-and-funct.css';

class ClockClass extends React.Component<any, { date: Date }> {

    timerId: NodeJS.Timer | undefined;

    constructor(props: any) {
        super(props);

        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({date: new Date()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        this.timerId = undefined;
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{ date: Date }>, snapshot?: any) {

    }

    render() {
        const {date} = this.state;

        return (
            <div>{date.toLocaleTimeString()}</div>
        );
    }
}


const ClockFunc = forwardRef<HTMLDivElement>((_, ref) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log('Функциональный компонент родился');

        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            console.log('Функциональный компонент размонтирован!')
            clearInterval(timerId);
        }
    }, []);

    useEffect(() => {
        console.log('Дата изменилась!');
    }, [date]);

    return (
        <Fragment>
            <span>Текущая дата:</span>
            <div ref={ref}>{date.toLocaleTimeString()}</div>
        </Fragment>
    );
});

class ClassComponent extends React.Component {

    render() {

        return (
            <div className="my-component">
                I'm class component
            </div>
        )
    }
}

const FunctionComponent = memo(() => {
    useEffect(() => {
        console.log('FunctionComponent rendered');
    });

    return (
        <div className='my-component' >
            I'm function component
        </div>
    )
})

export { ClockClass, ClockFunc, ClassComponent, FunctionComponent };
