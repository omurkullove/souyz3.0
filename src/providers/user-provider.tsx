'use client';

import { IUser } from '@my_types/auth-types';
import { decrypt } from '@src/utils/helpers';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
    user: IUser | null;
    updateUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{
    children: ReactNode;
    session: string;
}> = ({ children, session }) => {
    const [state, setState] = useState<IUser | null>(decrypt(session)?.user);

    const handleUpdateUser = (newUser: IUser | null) => {
        setState(newUser);
    };

    return (
        <UserContext.Provider value={{ user: state, updateUser: handleUpdateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};
