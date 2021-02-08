# Manual tests

* Testing Firestore
  * For testing purposes, there exist 2 test students and 2 test instructors in the database who belong to various courses:
    * test_s_uid_1 - test_course_1
    * test_i_uid_1 - test_course_1
    * test_s_uid_2 - test_course_2
    * test_i_uid_2 - test_course_2
  * All security rules tests can be done in the Rules Playground on the Google Cloud Firestore console.
  * Test: Ensure a student can access their own document:
    1. Set location to /databases/{default}/documents/students/test_s_uid_1
    2. Set authenticated to ```true```
    3. Set Firebase UID to test_s_uid_1
    4. Click "Run"
    5. This should be an allowed read.
  * Test: Ensure a student cannot access a document that does not belong to them:
    1. Set location to /databases/{default}/documents/students/test_s_uid_1
    2. Set authenticated to ```true```
    3. Set Firebase UID to test_s_uid_2
    4. Click "Run"
    5. This should throw a ```simulator.rules``` error
  * Test: Ensure an instructor can access the documents belonging to students in their course:
    1. Set location to /databases/{default}/documents/students/test_s_uid_1
    2. Set authenticated to ```true```
    3. Set Firebase UID to test_i_uid_1
    4. Click "Run"
    5. This should be an allowed read.
  * Test: Ensure an instructor cannot access the documents belonging to students in another course:
    1. Set location to /databases/{default}/documents/students/test_s_uid_1
    2. Set authenticated to ```true```
    3. Set Firebase UID to test_i_uid_2
    4. Click "Run"
    5. This should be a denied read.
  * Test: Ensure an instructor can access their own document:
    1. Set location to /databases/{default}/documents/students/test_i_uid_1
    2. Set authenticated to ```true```
    3. Set Firebase UID to test_i_uid_1
    4. Click "Run"
    5. This should be an allowed read.
  * Test: Ensure an instructor cannot access a document that does not belong to them:
    1. Set location to /databases/{default}/documents/students/test_i_uid_1
    2. Set authenticated to ```true```
    3. Set Firebase UID to test_i_uid_2
    4. Click "Run"
    5. This should throw a ```simulator.rules``` error
   

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