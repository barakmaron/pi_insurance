import { useState } from "react";

export default function useView(){
    const [successful, setSuccessful] = useState(false);
    const [failed, setFailed] = useState(false);
    const [message, setMessage] = useState("");

    return { 
        successful,
        setSuccessful,
        failed,
        setFailed,
        message, 
        setMessage
    };
}