<template>
  <v-app>
    <v-app-bar app color="#393e46" dark>
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

<style>

body {
  background-color: #EEEEEE;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 5px;
}
body, html {
  margin: 0;
  height: 100%;
}

#app {
    width: 65%;
}

</style>