# Getting Started

### Setup configuration file

Copy .env.template to .env and adjust the properties accordingly.

|Config Property| Config Description
|---|---|
|HOST | the host you wish to run the application on|
|PORT | the port you wish to run the application on|
|TEST_DATA | the path to your test data (default: \_\_test_data\_\_/notes.db)| 
```shell
cp .env.template .env
```
#### * important: keep TEST_DATA value if you wish to start the application with some test data to test sorting mechanism more easily.


### Available NPM scripts
| Commands  |  Description |
|---|---|
| ```npm run stylelint```  |   Tests whether the CSS files are OK. |
| ```npm run stylelint:fix```  |   Fixes all CSS errors detected that are auto-fixable. |
| ```npm run w3c```  |   Tests whether the HTML files are OK. |
| ```npm run w3c:fix```  |   Fixes all HTML errors detected that are auto-fixable. |
| ```npm run eslint```  |  Tests whether the JS files are OK. |
| ```npm run eslint:fix```  |  Fixes all JS errors detected that are auto-fixable. |
| ```npm run all```  |   Runs the tests for CSS / HTML / JS. |
| ```npm run fix all```  |  Fixes all CSS / HTML / JS that are auto-fixable. |
| ```npm run start```  |  Starts the web server at: http://localhost:3000 |
| ```npm run dev```  |  Starts the web server at: http://localhost:3000 in Dev mode with Nodemon FileWatcher. Your application will auto restart when changes are detected in relevant files. |
