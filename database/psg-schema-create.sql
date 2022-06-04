create sequence produto_id_seq;

alter sequence produto_id_seq owner to oqjrgyqueigkby;

create sequence usuario_id_seq;

alter sequence usuario_id_seq owner to oqjrgyqueigkby;

create sequence json_schema_id_seq;

alter sequence json_schema_id_seq owner to oqjrgyqueigkby;

create table if not exists produto
(
    id        integer default nextval('produto_id_seq'::regclass) not null
        constraint produto_pk
            primary key,
    descricao varchar(200)                                        not null,
    valor     numeric default 0                                   not null,
    marca     varchar(100)
);

alter table produto
    owner to oqjrgyqueigkby;

create unique index if not exists produto_id_idx
    on produto (id);

create table if not exists usuario
(
    id    integer      default nextval('usuario_id_seq'::regclass) not null
        constraint usuario_pk
            primary key,
    nome  varchar(200)                                             not null,
    email varchar(100)                                             not null,
    login varchar(100)                                             not null,
    senha varchar(100)                                             not null,
    roles varchar(200) default 'USER'::character varying           not null
);

alter table usuario
    owner to oqjrgyqueigkby;

create table if not exists json_schema
(
    id            integer default nextval('json_schema_id_seq'::regclass) not null
        constraint json_schema_pk
            primary key,
    identificador varchar(100)                                            not null,
    schema_value  text                                                    not null
);

alter table json_schema
    owner to oqjrgyqueigkby;

