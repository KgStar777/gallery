// "use client"
import { headers } from "next/headers";
import { createContext, ReactNode, useContext, useState } from "react";
import { isMobile as isMobileFn } from "../utils/isMobile";


interface IUserStateModel {
    isMobile: boolean;
}

interface IUserContextModel {
    userState: IUserStateModel;
}

export const UserContext = createContext<IUserContextModel>({
    userState: {
        isMobile: false,
    }
});

export const UserContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobileFn(userAgent);

    const [state, setState] = useState<IUserStateModel>({
        isMobile: mobileCheck,
    });

    return (
        <UserContext.Provider value={{
            userState: state,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
