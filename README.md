# Om Prajapati URL Shortener
## Here are three areas I would focus on for improvement:
Further Improve Modularity: We've started the process of making the code more modular by separating the SQL code and actions into their own file (persist.ts). However, this can be taken further. For example, the database connection handling (getDB) can also be separated into a dedicated module. This can make the code easier to manage and expand in the future.

Expand Test Coverage: While we've added some tests, additional tests could be added to cover edge cases (e.g., what happens if an invalid URL is provided?).

Improving Error Handling: Our current application doesn't have robust error handling. If an invalid URL is provided or the server is not running properly, the application may not respond appropriately, and the user is left to debug on their own or just without an answer. Adding error handling will improve the reliability of the application and provide better feedback to the users and devs.

## Improvements I Made

I have been attempting to generate a QR code whenever a shortened url is created, however I did run into some issues with this and can't seem to solve them. I instaled all the necessary dependencies and imports, and if you look at the code I attempt to use them and generate the QR code, however I cannot seem to find the issue. I will continue working on this and eventually try and host this local app as a web app using Heroku as the project has been quite a fun challenge so far and I'd love to take it further :)

The improvements which I have successfully made are UI/UX improvments. I have changed the url list design choice to cards which display the shortened url, the original url, and a button to generate a QR code which does not work as stated above. I've also added the functionality for a small popup to appear when a url is successful shortened using the 'useToast' import. Finally, I've made some other minor changes, such as the backdrop around the url input box, and a buffer which appears when loading a url(the urls get generated to quickly for this to be seen). Check out the video below!


https://github.com/oprajapati1/everything/assets/65799270/8589f5a0-c2e5-47f4-a2af-11be548ed30e


Thank you for this oppurtunity, I think it's really unique and rewarding how we get to leave this application with new skills and a whole project which you've helped us guide to build. It's been super fun to build this and all the challenges that came with, and I really appreciate it!
