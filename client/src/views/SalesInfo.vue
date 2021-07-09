<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
      <!-- list refering to sales info - material design icon pack -->
      <v-row justify="center">
        
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">Sales Info</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <div>
                  <ul id="v-for-object" class="demo">
                    <li v-for="(value, idx) in object" v-bind:key="idx">
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          {{idx}} . {{ value }} 
                        </v-col>
                      </v-row>
                    </li>
                  </ul>
                </div>
                <v-row>
                  <v-col cols="12" sm="6" md="6"> </v-col>

                  <v-col cols="12" sm="6" md="6"> </v-col>

                  <v-col cols="12"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn> -->
            </v-card-actions>
          </v-card>
    
      </v-row>
    </div>
    <ClientInfo
      :blockValue="blockValue"
      :unitValue="unitValue"
      :dialog="clientDialog"
      @closeForm="closeClientForm"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import ClientInfo from "../components/ClientInfo.vue";
// let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)
export default {
  name: "salesinfo",
  //name: "apartment",
  components: {
    ClientInfo,
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

    // what kind of data do i push into the axios data: property. the unit obviously uses the developement.id from the store?
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
          console.log("CLIENT-SIDE, Connor RESPONSE DATA",response.data);
          this.object = response.data;
          console.log(response.data);
        },
        (error) => {
          console.log("the Error", error);
        }
      )
      .catch((e) => {
        console.log("THERE IS AN ERROR", e);
      });
  },
  methods: {
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
