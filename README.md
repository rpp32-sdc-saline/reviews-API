# API Service - Review

<h1 align="center">System Design Capstone</h1>

Custom-built RESTful API to support server and database operations for the Review section of the e-commerce service Atelier StoreFront.

# Introduction

The goal was to deisgn a backend system that can support the full (retail product) data set for the project and can scale to meet the demands of production level traffic.

* This projects consists of a Nginx load balancer, a Node/Express server, and a PostgreSQL database
* Performed an ETL (Extract, Transform, Load) process on a raw data set consisting of over eleven million records
* Designed and build an API server to provide data to the client in the format specified by the API documentation
* Deployed to AWS EC2 instances
* Optimized to handle product level traffic, verified by load testing.

# Preformance Results
When tested with loader.io with a maximum of 1200 users per second, registered an average response time of 6 ms with a 0.0% error rate.
![image](https://user-images.githubusercontent.com/82000132/159098244-23f412a0-2f0f-46a7-bcab-a30b909e08f9.png)

# Technologies:

<table>
  <tbody>
    <tr>
      <th>Programming Languages</th>
      <td>
        <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
      </td>
    </tr>
    <tr>
      <th> RunTime Environment</th>
      <td>
        <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
        <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/>
        <img alt="Nginx" src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Database</th>
      <td>
        <img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>
        <img alt="Redis" src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white">
        <img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
      </td>
    </tr>
    <tr>
      <th>Testing</th>
      <td>
        <img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
        <img alt="MOCHA" src="https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white">
        <img alt="Loader.io" src="https://img.shields.io/badge/-Loader-black?style=for-the-badge&logo=loader&logoColor=white">
        <img alt="New Relic" src="https://img.shields.io/badge/-New%20Relic-black?style=for-the-badge&logo=Relic&logoColor=white">
        <img alt="K6" src="https://img.shields.io/badge/-K6-purple?style=for-the-badge&logo=K6&logoColor=white">
      </td>
    </tr>
    <tr>
      <th>Utilities</th>
      <td>
        <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
        <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
      </td>
    </tr>
     <tr>
      <th>Workflow</th>
      <td>
        <img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
        <img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?&style=for-the-badge&logo=Trello&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Deployment</th>
      <td>
        <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/>
      </td>
    </tr>
  </tbody>
</table>

# Application Diagram
![image](https://user-images.githubusercontent.com/82000132/159100651-86ab0e1b-9b57-45f6-9463-1222bf46429c.png)

# Extra Links
* Ticketing System: [Trello](https://trello.com/b/o96qO8QZ/rpp32-sdc-saline)
* Engineering Journals: [Engineering Journals](https://docs.google.com/document/d/1-zNLaD0D6WcOhddN1hnHXZn48k6C0WEt5pxpz56degA/edit)
