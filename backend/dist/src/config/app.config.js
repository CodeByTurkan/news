"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        db: {
            host: process.env.PG_HOST ?? 'localhost',
            port: parseInt(process.env.PG_PORT ?? '5432', 10),
            username: process.env.PG_NAME ?? 'news_node_db_dev',
            password: process.env.PG_PASSWORD ?? '12345678',
            database: process.env.PG_DATABASE ?? 'postgres',
        },
        jwtSecret: process.env.JWT_SECRET ?? 'turboturkan123',
    },
});
//# sourceMappingURL=app.config.js.map