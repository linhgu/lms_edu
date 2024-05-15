import { ReactNode } from 'react';

const AuthPage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col h-full  items-center justify-center">
            <h2 className="text-5xl font-bold mb-6">Welcome to LMS-Education</h2>
            {children}
        </div>
    );
};

export default AuthPage;
