
mysql> select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
ERROR 1046 (3D000): No database selected
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| data               |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)

mysql> use data;
Database changed

mysql> CREATE TABLE city (
    ->     City varchar(255)
    -> );
Query OK, 0 rows affected (0.03 sec)

mysql> select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
mysql> SHOW VARAIABLES LIKE "secure_file_priv";
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'VARAIABLES LIKE "secure_file_priv"' at line 1
mysql> SHOW VARAIABLES LIKE "secure_file_priv";
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'VARAIABLES LIKE "secure_file_priv"' at line 1
mysql> SHOW VARIABLES LIKE "secure_file_priv";
+------------------+------------------------------------------------+
| Variable_name    | Value                                          |
+------------------+------------------------------------------------+
| secure_file_priv | C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\ |
+------------------+------------------------------------------------+
1 row in set (0.01 sec)

mysql> select * into outfile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
Query OK, 0 rows affected (0.00 sec)

mysql> INSERT INTO city(city);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 1
mysql> INSERT INTO city(city)
    -> \c
mysql> insert into city(City)
    -> values ('Ghaziabad');
Query OK, 1 row affected (0.01 sec)

mysql> insert into city(City)
    -> values ('Banglore');
Query OK, 1 row affected (0.00 sec)

mysql> insert into city(City)
    -> values ('Mumbai');
Query OK, 1 row affected (0.00 sec)

mysql> insert into city(City)
    -> values ('Kolkata');
Query OK, 1 row affected (0.01 sec)

mysql> select * into outfile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
ERROR 1086 (HY000): File 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' already exists
mysql> select * into outfile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
Query OK, 4 rows affected (0.00 sec)

mysql> insert into city(City)
    -> values ('New Delhi');
Query OK, 1 row affected (0.00 sec)

mysql> insert into city(City)
    -> values ('Saharanpur');
Query OK, 1 row affected (0.00 sec)

mysql> insert into city(City)
    -> values ('Meerut');
Query OK, 1 row affected (0.00 sec)

mysql> select * into outfile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
