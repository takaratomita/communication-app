DROP DATABASE IF EXISTS reports_db;
CREATE DATABASE reports_db;

DROP USER IF EXISTS takara;
-- CREATE USER takara@localhost IDENTIFIED BY 'takara0512';

-- GRANT ALL ON reports_db. * TO 'takara'@'localhost';
GRANT ALL ON reports_db. * TO 'root'@'localhost';

USE reports_db;

DROP TABLE IF EXISTS report;
CREATE TABLE report (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(140),
    body TEXT,
    category SET
    ('文系', '理系', '法学', '経済学', '文学', '人文学', '教育学', '語学', '理学', '工学', '農学', '医学', '薬学', '歯学', '看護学', '情報工学', 'その他'),
    img BLOB,
    posted DATETIME,
    primary key(id)
);