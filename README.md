# Smartsheet-Integration-Node
[Trading Hours Gen Engine](https://user-images.githubusercontent.com/84505567/193702475-44ef6542-91b1-4b89-9b60-4fd5690d47d6.png)


- Automation project done with the motivation to reduce manual human intervention.  

Prior to the development of this automation engine, tasks were done in a traditional fashion: The process included getting data from the Smartsheet Source in a bulk (Huge Dataset in often cases not required ones) which would take 3-5 mins (Depeniding on the bandwith of the internet). 
- Once the data would finally load in the Locally present Excel Sheet, team would run it through a gigantic flow of Tableau prep to cleanse the data. However, the painful part was the data was still not obtained in the required format as per our stakeholders. 
- The process would involve more cleansing and manual intervention by a human to produce the desired format required by our Stakeholders. To add on the process was highly error prone and repeatative.!

So, here the story beings wouldn't it be ideal if the data that is alredy located somewhere in the cloud can be extracted on a cloud sever, then have the final required set of data as per the stakeholder sent to them on the fly and update the required source accordingly?

This is how the idea forstered and ultimately the project scaled on a broarder terms as I progressed with adding bunch of functionality to the engine. 

The tech stack of the project looks like:

- Node.js
- Smartsheet API SDK for JavaScript. 
- MongoDB. 
- Node Mailer integrated with Outlook SMTP provider.
- Currently Deployed in Heroku (Migration to AWS on the way).

Luckily, as invovation grows. This project gave birth to my Simplistic package to write CSV with Node.js which is a WIP for it's first release. 

