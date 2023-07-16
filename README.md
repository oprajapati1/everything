# Om Prajapati Technical Challenge Responses
## Here are three areas I would focus on for improvement:
Further Improve Modularity: We've started the process of making the code more modular by separating the SQL code and actions into their own file (persist.ts). However, this can be taken further. For example, the database connection handling (getDB) can also be separated into a dedicated module. This can make the code easier to manage and expand in the future.

Expand Test Coverage: While we've added some tests, additional tests could be added to cover edge cases (e.g., what happens if an invalid URL is provided?).

Improving Error Handling: Our current application doesn't have robust error handling. If an invalid URL is provided or the server is not running properly, the application may not respond appropriately, and the user is left to debug on their own or just without an answer. Adding error handling will improve the reliability of the application and provide better feedback to the users and devs.

## Improvements I Made

Starting with visual enhancements, I introduced a subtle backdrop shadow to the main box of the application and a slight modification to the title, both in terms of the font and the name itself, to better align with the overall style and aesthetic of the application.

Secondly, I made the effort to host the application as a web app by integrating the frontend with Heroku to make the URL shortener available to anyone.

However, there were some challenges with this aspect. Due to the nature of the application's architecture and the use of SQLite, currently, the backend server needs to be run locally for the web app to function correctly. This means, for the time being, to use the application, you would need to clone the repository and run the server locally. It's a slight detour from the ideal state of a fully deployed web application, but I will continue to work on it and will definitely get it running; check-in later :)

[Here is the web-app(Be sure to run the backend locally using ```yarn nx serve url-server```)](https://omsurlshortener-14dbe287a19f.herokuapp.com/)

# Everything

This is the C4C monorepo containing all of our active projects.

Deployable units exist in `/apps`, inside each folder there is a README explaining how that unit is tested and deployed.

Business logic and supporting library for those deployable units exist in `/libs`. These are composable units of software that are not coupled to a specific deployment framework or strategy, and are meant to be easily reused in future projects.

The purpose of `README.md`s in this repository are to explain the usage of the application. The bare minimum you need to get it running. More detailed developer and public documentation exists on the wiki. `README.md`s will often link to relevant wiki pages.


Links to Project `README.md`

- [Monarch](./apps/monarch/README.md)
- [c4cneu.com](./apps/dotcom/README.md)


## 🔨 Development
1. Install Node v16.x
2. Clone this repo
3. `yarn install`

When adding new dependencies, use `yarn add` or its dev dependency equivalent. Thanks to Nx, each package will only be installed once, and each app knows how to bundle itself correctly based on its dependencies.
