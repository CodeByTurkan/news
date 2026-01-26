-- Create user if not exists
DO \$\$
psql -h localhost -p 5432 -U postgres -d postgres 

12345678

\c news_node_db_dev
postgres=# \c news_node_db_dev
You are now connected to database "news_node_db_dev" as user "postgres".
news_node_db_dev=# 
news_node_db_dev=# \dt

BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'news_node_db_dev') THEN
    CREATE USER news_node_db_dev WITH PASSWORD '12345678';
  END IF;
END
\$\$;

-- Grant privileges
ALTER USER news_node_db_dev CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE postgres TO news_node_db_dev;
