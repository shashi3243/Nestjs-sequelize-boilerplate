import { LiquibaseConfig, Liquibase } from 'liquibase';

const myConfig: LiquibaseConfig = {
  changeLogFile: './changelog.xml',
  url: 'jdbc:mysql://localhost:3306/projectNestjs',
  username: 'root',
  password: 'password',
  classpath: '/usr/share/java/mysql-connector-java-9.0.0.jar',
};
const instance = new Liquibase(myConfig);

async function doEet() {
  // << for execute data into table >>>
  await instance.update({});
  // << for check status using liquebase >>>
  // await instance.status();
  //   <<<<<<< for delete all the tables from db >>>>>>>>
  // await instance.dropAll();
}

doEet();
