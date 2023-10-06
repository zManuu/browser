<template>
  <div class="flex flex-col">
    <h1>Welcome!</h1>
    <router-link to="/browse/C:\\">Click to browse</router-link>
    <router-link to="/test/contextmenu/file">Click to test contextmenu with a file</router-link>
    <router-link to="/test/contextmenu/directory"
      >Click to test contextmenu with a directory</router-link
    >
    <router-link to="/test/preview/file">Click to test preview with a file</router-link>
    <router-link to="/test/preview/directory">Click to test preview with a directory</router-link>
    <router-link to="/test/confirm">Click to test the confirm component</router-link>
  </div>
</template>
