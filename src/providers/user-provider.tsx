'use client';

import { ISession } from '@my_types/auth-types';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
    user: ISession | null;
    updateUser: (user: ISession | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{
    children: ReactNode;
    user: ISession;
}> = ({ children, user }) => {
    const [state, setState] = useState<ISession | null>(user);

    const handleUpdateUser = (newUser: ISession | null) => {
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
