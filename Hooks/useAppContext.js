import { createContext, useContext, useState, useEffect } from "react";
import SendApiRequest from "../services/ApiService";

const AppContext = createContext();

export function AppWrapper({ children }){
    const [logged_in, setLogin] = useState(false);

    useEffect(() => {
        const check_user = async () => {
            try {
                const token = await SendApiRequest(`/api/auth/login`);
                setLogin(true);
            } catch (err) {
                setLogin(false);
            }
        };
        check_user();
    }, []);

    return <AppContext.Provider value={{logged_in, setLogin}}>
        {children}
    </AppContext.Provider>;
}

export function useAppContext() {
    return useContext(AppContext);
}