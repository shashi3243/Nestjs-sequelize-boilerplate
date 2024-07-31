--liquibase formatted sql

--changeset shashikant:1722412053
--comment add test column in user table
ALTER TABLE user
ADD test varchar(255);

--changeset shashikant:1722430685
--comment delete test column in user table
ALTER TABLE user DROP COLUMN test;