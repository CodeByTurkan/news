export interface DbConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
declare const _default: () => {
    app: {
        db: DbConfig;
        jwtSecret: string;
    };
};
export default _default;
