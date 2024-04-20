import {useEffect, useLayoutEffect, useRef, useState} from "react";
import { isEqual } from 'lodash';

type FuncType = ((...args: any[]) => Promise<any>) | false | undefined | null | 0 | '';

type PropsType = any[];

interface IUseRequestReturnProps<Data> {
    data: Data | null;
    error: any | null;
    isLoading: boolean;
};

const INITIAL_VALUE_PROPS:any[] = [];

const useRequest = <Data = any>(func: FuncType, props: PropsType = INITIAL_VALUE_PROPS): IUseRequestReturnProps<Data> => {
    const deps = [func, ...props];
    const prevDepsRef = useRef<any>(null);
    const requestRef = useRef<null | Promise<any>>(null);

    const controllerRef = useRef(new AbortController());

    const [data, setData] = useState<null | Data>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!isEqual(prevDepsRef.current, deps)) {

            if (requestRef.current) {
                controllerRef.current.abort();
                requestRef.current = null;
            }

            if (!!func) {
                controllerRef.current = new AbortController();
                requestRef.current = func(...props, { signal: controllerRef.current.signal });

                requestRef.current!.then(response => {
                    if (!controllerRef.current.signal.aborted) {
                        setData(response);
                        setError(null);
                        requestRef.current = null;
                    }
                }).catch(error => {
                    if (!controllerRef.current.signal.aborted) {
                        setError(error);
                        requestRef.current = null;
                    }
                })
            } else {
                setData(null);
                setError(null);
            }

            prevDepsRef.current = deps;
        }
    });

    return {
        data,
        error,
        isLoading: !!requestRef.current,
    };
}

export { useRequest };
