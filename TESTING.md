# Manual tests

* Testing Register
    1. Register on register page
    2. Verify example page can be accessed
* Testing Sign Out
    1. Click sign out button
    2. Verify example page can not be accessed
    3. Verify you are redirected to login
* Testing login
    1. Enter credientials
    2. Verify you can access example page

# Automated Tests

To run tests type `npm run test` and you will be presented with a choice of test
suites which van be run.

## Writing automated tests

Tests for this repository are written using jest. For more information look at this
[tutorial](https://reactjs.org/docs/testing.html).