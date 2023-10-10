## Browser

A custom browser using electron, vite and vue.  
Uses [electron-vite by alex8088](https://github.com/alex8088/electron-vite-boilerplate/).

## Setup

1. Install all node dependencies via *npm install*
2. Create a file in the [shared-folder](src/shared): Config-Platform.ts.
    1. Take a look at [the template file](src/shared/Config-Platform-Template.ts).
    2. The Config-Platform.ts has to default export a *PROJECT_PATH*
3. Good to go

## Good to know

- On the main process (running on node), a winston logger in available. This logger forwards all logs to the renderer process. Logging paths must be done in the following syntax: >"{path}"<. Example: ```logger.info(`Path: >${path}<`)```. If this syntax is not followed, the terminal setting to shorten paths won't work. The syntax can be changed in the [config](src/shared/Config.ts).