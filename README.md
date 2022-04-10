
**

## The project is about application for exchange of children's clothes and accessories.

**



**Short info and functionalities:**

In this project I have a simple Angular site, where a people can login, get registration, publish an item if logged in the profile and take a look for published items.

When open the app, as a home page, can see a list of items, published from the existing users(The Public Part).  
Every Item has a detail page with more information. To add an item to the list, first need to be logged in, if don't have a registration, it can be done by cliking on the registration link in the navigation on the top.  
When we are logged, the navigation has diferent links, including 'profile' and 'lgout'. By cliking on 'profile'(The Private Part) it will be shown a form to add an item, by appruvel the item will be shown on the list on the home page.

For back end is used Strapi (https://strapi.io/). For the communication to the remote server is used GraphQL by Apollo Angular.



**Components:**


- Home module - contains Items list components.
- Login module - contains Login components.
- Registration module - contains Register   components.
- My profile module - contains Add item components.
- Item detail - contains item detail components.



***For package manager for the backend is used YARN!***

**To make all work:**

-In the console enter to ema-backend folder and set "yarn develop", this will generate a host link for the backend, where can manage everything (add and delete users, items; can appruve items added from users).

-In the another console window enter to ema-frontend folder and start the angular project to see the site.
