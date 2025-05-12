# Task 2: Implement Login Functionality

## Permitted Help

✅ You are only allowed to use existing code in this codebase as reference for this task

❌ **You are not allowed to use the web (e.g., searching via Google, Stackoverflow, documentations ...)**

❌ **You are not allowed to use generative AI like ChatGPT**

## Setting

### Folder structure

All relevant files can be found in:

- [**Backend**: /apps/api/...](./apps/api/)
- [**↪  Routing File**: /apps/api/src/routes.ts](./apps/api/src/routes.ts)
- [**↪  Controllers**: /apps/api/src/controllers/...](./apps/api/src/controllers/)
- [**↪  User Model**: /apps/api/src/models/User.ts](./apps/api/src/models/User.ts) (stores user in database)

<br/>

*No changes needed, but for reference*:

- [***Database**: /apps/api/src/db/...*](./apps/api/src/db/)

- [***Frontend**: /apps/web/...*](./apps/web/)
    - [*RegisterModal Component: /apps/web/components/Modals/RegisterModal.tsx*](./apps/web/components/Modals/RegisterModal.tsx)
    - [*LoginModal Component: /apps/web/components/Modals/LoginModal.tsx*](./apps/web/components/Modals/LoginModal.tsx)


## Task 2 ToDo's (Definitions of Done):

Similarly to the registration functionality of Task 1, now implement the login functionality:

**Important before starting:** 
- The ToDo's are in no particular order
- Your team lead recommended to check out all relevant files first, and see how they are connected to get an understanding of the system.

<br/>

⬜︎ Update `loginUser` and `getCurrentUser` functions in [/apps/web/app/actions/user.actions.ts](./apps/web/app/actions/user.actions.ts) to use the new `internalClient`.

⬜︎ Add login functionality in the [auth.controller.ts](./apps/api/src/controllers/auth.controllers.ts) controller.

⬜︎ Add a new login route

⬜︎ Add missing function(s) in [User.ts](./apps/api/src/models/User.ts) for database interaction.

<br/>

**Task 1 Final ToDo:** 

⬜︎ Test your implementation by using the frontend (e.g. running at [http://127.0.0.1:3000](http://127.0.0.1:3000)): To test the login function, you can try to click the Login button on the top right corner. If you can't see the button, make the browser window fullscreen. **Make sure the user exists (i.e. is registered) before trying to login**.


<h3 style="color: green; text-align: center">If you can login a user without errors, you successfully completed Task 2 ✅</h3>
<p style="text-align: center">i.e. Success message is shown and the top right corner displays the profile instead of Login and Register buttons.</p>

---

<br/>

**Before ending the experiment, fill out these 2 forms:** 

1. [**Experience Questionnaire 2**: https://forms.office.com/e/3cZktQ4Whq](https://forms.office.com/e/3cZktQ4Whq)
2. [**Task 2 Questionnaire**: https://forms.office.com/e/ciTsGc2uUT](https://forms.office.com/e/ciTsGc2uUT)


<br/>

---

<h3 style="text-align: center">You've completed the experiment. Thank you!</h3>
