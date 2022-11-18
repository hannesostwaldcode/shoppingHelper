<template>
<div id="app">
 
  <p>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/">Go to Ingredient</router-link>
    <router-link to="/sd">Go to Recipe</router-link>
    <router-link to="/addU">Go to User</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <div class="bg-accentwhite-light overflow-hidden h-screen w-screen">
  <router-view/>
</div>
</div>


</template>

<script setup>

</script>
