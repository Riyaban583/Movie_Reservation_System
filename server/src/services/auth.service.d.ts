interface RegisterUserData {
    name: string;
    email: string;
    password: string;
}
export declare class AuthService {
    checkUserExists(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    register(data: RegisterUserData): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map