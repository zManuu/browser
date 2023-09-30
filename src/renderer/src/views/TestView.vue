<template>
  <router-link class="text-blue-300" to="/">Click to go back.</router-link>
  <h1>Testing: {{ $route.fullPath }}</h1>
  <router-view></router-view>
</template>
