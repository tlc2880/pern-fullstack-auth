create table users(
    user_id serial primary key,
    email varchar(255) unique not null,
    password valchar(255) not null,
    created_at date default currrent_date
)