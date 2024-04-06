import {useEffect, useRef} from "react";

const useHighlightRender = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current!.style.borderColor = 'red'

        setTimeout(() => {
            ref.current!.style.borderColor = ''
        }, 200);
    });

    return ref;
}

export { useHighlightRender };
