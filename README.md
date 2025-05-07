## SmartFin

This project was submitted as a final assignment for the Building Startup Systems course at Cornell Tech for the Sprint 2025 semester. 

We are 4 students from the Connective Media, Health Tech, and Computer Science programs that developed the front end and back end components of a website that serves as a promotional page for a mobile app startup called SmartFin. SmartFin is a student-oriented mobile application employing behavioral and predictive analytics that leverages users' monetary transactions. It delivers personalized credit management plans, promotes healthy spending habits, and builds community around financial stability. This website gives viewers the opportunitiy to learn more about what SmartFin has to offer for college students and how to get started, similar to the Bumble promotional website. Current users can log in to purchase items they accumulated on the app and use them to redeem prizes they can afford. 

As a team, we worked together to develop the following components on our website:

### Frontend/UI
- HTML is standards-conform and well-structured (e.g. avoids unnecessarily nested divs)
- CSS ensures no content is cut off or unreadable on all screen sizes, from phones to desktop screens.
- The website's components' styling is consistent.
(e.g. when using a component library, any custom components we build fit with the UI library's style.)
- The web app is optimized — not just functional — for a variety of different screen sizes, such as a smartphone
- The web app uses animation and transitions tastefully where appropriate
- The web app uses custom CSS keyframe animations
- The web app implements custom input components


### Backend/Server
- The project is publicly accessible via a HTTPS URL.
- The application has a server component that:
  - we wrote code for
  - responds to requests from your front-end
(Next.js Server Actions and Mutations count, as would a Hono App reacting to frontend requests from React. Building only an API without any front-end user interaction would not.)
and centralizes data into a single source of truth
(e.g. stores it in a database, or centrally coordinates syncing)


### Authentication
- The web app allows a user to persist their data in the app.
- The web app doesn't expose one user's data to other users.
- The web app has a server backend that allows each user to access their own data using user accounts.
- The web app uses OAuth not just for authentication, but for accessing a third party's API on behalf of our users.


### Deployment/DevOps
- The project uses continuous integration
(it gets built when we push code)
- The project uses continuous delivery
(it gets deployed when we push our code)


Submitted on May 9, 2025
