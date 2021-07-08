<template>
  <div class="wrapper" >
    <div class="center">
       <pre>
      
          <div class="centerimg">
          <!-- image in assets/unfurnished-flat.jpg -->
          <v-img    class="mx-auto"                    
              :src="flatPic"
              max-height = '240'          
            ></v-img>
          </div>
          <!--
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
          -->                 
  
          <div>
            <v-autocomplete class="mx-auto"
              v-model="blockValue"
              :items="blocks"
              dense
              filled
              item-text="subsectionName"
              label="Choose Block"
              @change="chooseUnit"
            ></v-autocomplete>
          </div>      
       
          <div>
            <v-autocomplete class="mx-auto"
              v-model="unitValue"
              :items="items"
              dense
              filled
              item-text="unitName"
              label="Choose Unit"
            ></v-autocomplete>
          </div>    
    
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
  .centerimg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
  }
  .auto {
    padding: 5px 5px 5px 5px;
  }

</style>

<script>
import axios from "axios";
// let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)
export default {
  name: "salesstart",
  //name: "apartment",
  data() {
    return {
      blockValue: null,//From Dropdown
      unitValue: null,
      flatPic: require('../assets/unfurnished-flat.jpg'),
      items: [],
      blocks: [],
    };
  },
  async mounted() {
    console.log("Checking ID");
       console.log("Checking ID2");
    console.log("Connor",this.$store.state.development.id);
   
    let data = {      
      id: this.$store.state.development.id

    };
    await axios({
      method: "post",
      url: `http://localhost:3000/getblocksForOptions`,
      data: data
    })
      .then(
        response => {
          console.log(response.data)
          this.blocks = response.data;
           console.log(response.data);
        },
        error => {
          console.log("the Error", error);
        }
      )
      .catch(e => {
        console.log("THERE IS AN ERROR",e);
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
        url: `http://localhost:3000/getUnitsForOptions`,
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


