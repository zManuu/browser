## Browser

A custom browser using electron, vite and vue.  
Uses [electron-vite by alex8088](https://github.com/alex8088/electron-vite-boilerplate/).

## Setup

1. Install all node dependencies via *npm install*
2. Create a file in the [shared-folder](src/shared): Config-Platform.ts.
    1. Take a look at [the template file](src/shared/Config-Platform-Template.ts).
    2. The Config-Platform.ts has to default export a *PROJECT_PATH*
3. Good to go