import { useCallback, useState } from "react";

export default function useView(){
    const [successful, setSuccessful] = useState(false);
    const [failed, setFailed] = useState(false);
    const [message, setMessage] = useState("");

    const SetSuccessful = useCallback((message) => {
        setSuccessful(true);
        setFailed(false);
        setMessage(message)
    } ,[]);

    const SetFailed = useCallback((message) => {
        setSuccessful(false);
        setFailed(true);
        setMessage(message)
    } ,[]);

    return { 
        successful,
        failed,
        message, 
        SetFailed,
        SetSuccessful
    };
}