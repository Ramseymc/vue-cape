<template>
  <v-app>
    <v-app-bar app color="primary" dark>
     <v-btn text :to="{name: 'Home'}">Home</v-btn>
     <v-btn text :to="{name: 'about'}">About</v-btn>
     <v-btn text :to="{name: 'salesstart'}">Sales</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>