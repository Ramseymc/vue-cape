<template>

    <div class="about">
      <br /><br /><br />
      <!-- list refering to sales info - material design icon pack -->
      <!-- <v-row justify="center"> -->
        <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
        <!-- <v-card>
          <v-card-title>
            <span class="text-h5">Sales Info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <div>
                <ul id="v-for-object" class="demo">
                  <li v-for="(item, idx) in sales" v-bind:key="idx">
                    {{ item.block }}
                    {{ item.unit }}
                    {{ item.firstname }}
                    {{ item.lastname }}
                  </li>
                </ul>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card> -->

     <v-card class="mx-auto" max-width="1500" width="1000">
      <v-toolbar color="#0F0F0F" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>Sales</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn icon @click="dialog = true">
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn> -->
      </v-toolbar>




      <v-list two-line>
        <v-list-item-group
        
          active-class="blue--text"
          multiple
        >
          <template v-for="item in sales">
            <v-list-item :key="item.id">
              <v-list-item-content>
                <div style="display: flex; justify-content: flex-start;">
                <v-list-item-subtitle v-text="item.block"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.unit"></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.lastname"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.firstname"></v-list-item-subtitle>
                </div>
              </v-list-item-content>
              <v-list-item-action>
                <div>
                  <v-btn :id="item.id" text @click="deleteItem($event)"
                    ><v-icon color="red">mdi-delete</v-icon></v-btn
                  >
                  <v-btn :id="item.id" text 
                    ><v-icon color="green"
                      >mdi-file-document-edit</v-icon
                    ></v-btn
                  >
                  <a :href="item.fileOTPurl" download target>
                  
_                  <v-icon color="blue"
                      >mdi-file-document-edit</v-icon
                    >
                  </a>
               
                </div>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>

    </div>
   
</template>

<script>
import axios from "axios";

// let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)
export default {
  name: "salesinfo",
  //name: "apartment",
  components: {
    
  },
  data() {
    return {
      blockValue: null, //From Dropdown
      unitValue: null,
      flatPic: require("../assets/unfurnished-flat.jpg"),
      items: [],
      blocks: [],
      clientDialog: false,
      dialog: null,
      el: "#v-for-object",
      sales: [],
      url: "",
      object: {
        id: "",
        firstName: "",
        lastName: "",
        iDNumber: "",
        // bankName: "",
        // accountNumber: "",
        // accountType: "",
        block: "",
        unit: "",
        fileOTP: "",
      },
    };
  },
  async mounted() {
    // console.log("Connor", this.$store.state.development.id);
    this.url = this.$store.state.url
    this.initialData()
    // what kind of data do i push into the axios data: property. the unit obviously uses the developement.id from the store?
    // let data = {
    //   id: "",
    //   // id: this.$store.state.development.id,
    // };
    // await axios({
    //   method: "post",
    //   url: `http://localhost:3000/getClientInfoForSalesInfo`,
    //   data: data,
    // })
    //   .then(
    //     (response) => {
    //       console.log("CLIENT-SIDE, Connor RESPONSE DATA", response.data);
    //       console.log(response.data);

    //       this.sales = response.data;
    //       this.sales.forEach((el) => {
    //           el.fileOTPurl = `${this.url}/uploads/${el.fileOTP}`
    //         })
    //     },
    //     (error) => {
    //       console.log("the Error", error);
    //     }
    //   )
    //   .catch((e) => {
    //     console.log("THERE IS AN ERROR", e);
    //   });
  },
  methods: {
    async initialData() {
        let data = {
      id: "",
      // id: this.$store.state.development.id,
    };
    await axios({
      method: "post",
      url: `http://localhost:3000/getClientInfoForSalesInfo`,
      data: data,
    })
      .then(
        (response) => {
          console.log("CLIENT-SIDE, Connor RESPONSE DATA", response.data);
          console.log(response.data);

          this.sales = response.data;
          this.sales.forEach((el) => {
              el.fileOTPurl = `${this.url}/uploads/${el.fileOTP}`
            })
        },
        (error) => {
          console.log("the Error", error);
        }
      )
      .catch((e) => {
        console.log("THERE IS AN ERROR", e);
      });
    },
    async deleteItem(event) {
      let targetValue = event.currentTarget.id
      console.log(targetValue)
      let data = {
        id: targetValue
        }
      await axios({
      method: "post",
      url: `http://localhost:3000/deleteSalesRecord`,
      data: data,
    })
      .then(
        (response) => {
          console.log("CLIENT-SIDE, Connor RESPONSE DATA", response.data);
          this.initialData()
         
        },
        (error) => {
          console.log("the Error", error);
        }
      )
      .catch((e) => {
        console.log("THERE IS AN ERROR", e);
      });
    },
    closeClientForm(event) {
      this.clientDialog = event;
    },
    getClientInfo() {
      this.clientDialog = !this.clientDialog;
    },
    // async chooseUnit() {
    //   let filteredData = this.blocks.filter((el) => {
    //     return el.subsectionName === this.blockValue;
    //   });
    //   let data = {
    //     id: this.$store.state.development.id,
    //     subsection: filteredData[0].id,
    //   };
    //   await axios({
    //     method: "post",
    //     url: `http://localhost:3000/getUnitsForOptions`,
    //     data: data,
    //   })
    //     .then(
    //       (response) => {
    //         let filteredData = response.data.filter((el) => {
    //           return el.unitName.substring(2, 1) !== ".";
    //         });
    //         this.items = filteredData;
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     )
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
};
</script>
