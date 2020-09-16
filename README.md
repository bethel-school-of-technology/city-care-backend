# CityCare Group Final Project

          First steps create a project on GitHub to host for the group temporarily.  Create the basic angular front end with an empty express backend called back.
                    ng new City-Care - create the angular front end basic app with routing and css styles.
                    express --no-view - create an express backend with no view since it will be an api server verses an application. 
          Next Steps will be to connect the local project to github add collaborators to it, make it private and start work. 
                    git init - initialize local github repository
                    git add . - add everything in the project to the local repository.
                    git commit -m "First project commit, created front and back end."
                    git remote add origin git@github.com:tbone7243/Final_Group_Project_City_Care.git
                    git push -u origin master - push project 

                    git branch dev - create a project developer branch.         
                    git checkout dev - change into the dev branch to begin project work.
                    git add . - add everything to the dev branch.
                    git commit -m "First commit on the dev branch, added everything from the master branch."
                    git push -u origin dev - push the dev branch to the remote repository
                   on GitHub changed the default branch to the dev branch to leave the master branch in tact. 
                   From the terminal git pull to sync remote repository to the local repository. 



## Work on backend code invite collaborators. 

cd back - changed into the back end directory to install the necessary dependencies. 
          npm install 
          npm install --save-dev nodemon
          npm install --save mysql2 sequelize@4.43.0 jsonwebtoken cors bcryptjs

          sequelize init - create the config file
          added the connection code to the app.js file to communicate with MySQL.
          added the cors policy to the app.js file
          created the basic crud outline for the users and org routes. 
          added the org router to the app.js file
          created the auth.js service and folder, use email authentication for it. 

# Created the application models, made migrations and migrated 

sequelize model:generate --name users --attributes id:integer,FirstName:string,LastName:string,Email:string,Phone:integer,MobilePhone:integer,ContactMethod:string,Address1:string,Address2:string,City:string,State:string,County:string,Zip:integer

makemigration --name created_users_model

sequelize model:generate --name organizations --attributes id:integer,OrgName:string,ContactName:string,Phone:integer,Fax:integer,Email:string,Address1:string,Address2:string,City:string,State:string,County:string,Zip:integer

makemigration --name added_organizations_model

sequelize model:generate --name authorization --attributes Email:string,Password:string,Role:boolean,Active:boolean

makemigration --name added_authorization_model

sequelize model:generate --name listing --attributes id:integer,Quantity:integer,Description:string,Availability:string,Requirements:string,Category:string,SubCategory:string,OrgId:integer

makemigration --name added_listing_model

sequelize model:generate --name request --attributes id:integer,Description:string,Category:string,SubCategory:string,UserId:integer

makemigration --name added_request_model

sequelize model:generate –name category –attributes id:integer,Name:string

makemigration --name added_category_model

sequelize model:generate –name subcategory –attributes id:integer,CatId:integer,Name:string,Type:string

makemigration --name added_subcategory_model

npm install --save multer 
npm install --save body-parser
npm install --save connect-multiparty