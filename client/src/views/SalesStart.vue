<template>
  <div class="wrapper" >
    <div class="child">
     
      <pre>
    
        <div class="center">
        <!-- image in assets/unfurnished-flat.jpg -->
        <v-img 
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="137"
            
            src="https://picsum.photos/id/11/500/300"
          ></v-img>
        </div>
     
        <v-card>
        <!-- drop down Unit -->
        <h2> This is a drop down for Unit </h2>    
        <!-- add items from db - which table? -->
        <v-combobox
          filled
          solo
        ></v-combobox>   
        </v-card>
       
        <v-card>
          <!-- drop down Block -->
        <h3> This is a drop down for Block </h3>
        </v-card>
      
      </pre>
    </div>
  </div>
</template>


<style scoped>

  .img {
    padding: 20px 20px 20px 0;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

</style>

<script>
import axios from "axios";
let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)

export default {
  name: "apartment",
  data() {
    return {
      blockValue: null,//From Dropdown
      items: [],
      blocks: [],
    };
  },
  async mounted() {
    let data = {
      id: this.$store.state.development.id
    };
    await axios({
      method: "post",
      url: `${url}/getblocksForOptions`,
      data: data
    })
      .then(
        response => {
          this.blocks = response.data;
        },
        error => {
          console.log("the Error", error);
        }
      )
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    async chooseUnit() {
      let filteredData = this.blocks.filter(el => {
        return el.subsectionName === this.blockValue;
      });
      let data = {
        id: this.$store.state.development.id,
        subsection: filteredData[0].id
      };
      await axios({
        method: "post",
        url: `${url}/getUnitsForOptions`,
        data: data
      })
        .then(
          response => {
            let filteredData = response.data.filter(el => {
              return el.unitName.substring(2, 1) !== ".";
            });
            this.items = filteredData;
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
  
  }
};
</script>
