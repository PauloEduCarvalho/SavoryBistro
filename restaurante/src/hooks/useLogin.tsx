/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
import { api } from "../Server/api";
import { ClienteType } from "../pages/admin/Cliente";

interface UserContextProps {
    user: ClienteType | undefined;
    fetchCliente: (email: string) => void;
    getNomeUsuario: () => string | undefined;
    getIdUsuario: () => number | undefined;
    setUser: any;
}

const UserContext = createContext({} as UserContextProps);

interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<ClienteType>();

    const fetchCliente = async (email: string) => {
        try {
            const response = await api.get(`/users/login/${email}`);
            setUser(response.data);
        } catch (error) {
            console.log("Ocorreu um erro ", error);
        }
    };

    const getNomeUsuario = () => {
        return user?.nomeUsuario;
    };

    const getIdUsuario = () => {
        return user?.idUsuario;
    };

    return (
        <UserContext.Provider value={{
            user,
            fetchCliente,
            getNomeUsuario,
            getIdUsuario,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useLogin() {
    const context = useContext(UserContext);

    return context;
}
