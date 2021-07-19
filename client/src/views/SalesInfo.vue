<template>
  <v-container>
    <v-row justify="center">
      <div class="about">
        <br /><br /><br />

        <v-card class="mx-auto" max-width="1500" width="1000">
          <v-toolbar color="#0F0F0F" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Sales</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              prepend-icon="mdi-magnify"
              placholder="Search"
              label="Search"
              v-model="search"
            ></v-text-field>            
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group active-class="blue--text" multiple>
              <template v-for="item in salesFiltered">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <div style="display: flex; justify-content: flex-start">
                      <v-list-item-subtitle
                        v-text="item.block"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.unit"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle
                        v-text="item.lastname"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.firstname"
                      ></v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div>
                      <v-btn :id="item.id" text @click="deleteItem($event)"
                        ><v-icon color="brown"> mdi-delete</v-icon></v-btn
                      >
                      <v-btn :id="item.id" text @click="editItem($event)"
                        ><v-icon :color="item.iconColor"
                          >mdi-table-edit</v-icon
                        ></v-btn
                      >

                      <!-- CRM 2 : button colour change with salesEmailSent change to 'Y'-->
                      <v-btn :id="item.id" text @click="emailItem($event)" 
                        ><v-icon color="blue">mdi-email-outline</v-icon></v-btn
                      >

                      <!-- // button for file uploads dialog -->
                      <v-btn :id="item.id" text @click="showFiles($event)"
                        ><v-icon color="black">mdi-eye</v-icon></v-btn
                      >
                                         
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </v-row>
    <ClientUpdate
      v-if="salesEditData.length > 0"
      :dialog="clientDialog"
      :editData="salesEditData"
      @closeForm="closeClientForm"
    />
    <ClientFiles
      v-if="clientFilesData.length > 0"
      :dialogFiles="clientFileDialog"
      :fileData="clientFilesData"
      @closeForm="closeClientFiles"
    />
    <!-- :dialog="clientFileDialog" -->
  </v-container>
</template>

<script>
import axios from "axios";
import ClientUpdate from "../components/ClientUpdate.vue";
import ClientFiles from "../components/ClientFiles.vue";
// let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)
export default {
  name: "salesinfo",
  //name: "apartment",
  components: {
    ClientUpdate,
    ClientFiles,
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
      salesEditData: [],
      search: "",

      // client Files dialog
      clientFileDialog: false,
      clientFilesData: [],
      dialogFiles: null,
    };
  },
  computed: {
    salesFiltered() {
      if (this.search === "") {
        return this.sales;
      } else {
        return this.sales.filter((el) => {
          return (
            !this.search ||
            el.block.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            el.unit.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            el.firstname.toLowerCase().indexOf(this.search.toLowerCase()) >
              -1 ||
            el.lastname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      }
    },
  },
  async mounted() {    
    this.url = this.$store.state.url;
    this.initialData();

  },
  methods: {
    editItem(event) {
      let targetId = event.currentTarget.id;//Spot on
      console.log("EDIT ITEM ID",targetId);
      this.salesEditData = this.sales.filter((el) => {
        return el.id === parseInt(targetId);
      });
      console.log("salesEditData", this.salesEditData);
      this.clientDialog = true;
    },
    async emailItem(event) {
      let targetId = event.currentTarget.id;
      console.log("Target Id",targetId);
      console.log("Email Item SalesEditData = ", this.sales);
      let emailInfo = this.sales.filter((el) => {
        return el.id == parseInt(targetId)
      })
      console.log("XXXXX",emailInfo)

      let data = {
        info: emailInfo
      }

       await axios({
        method: "post",        
        url: `${this.url}/sendSalesInfoEmail`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE: RESPONSE DATA: ", response.data);
                      },
          (error) => {
            console.log("the Error", error);
          }
        )
        .catch((e) => {
          console.log("THERE IS AN ERROR", e);
        });
    },     
    async initialData() {
      let data = {
        id: "",       
      };
      await axios({
        method: "post",        
        url: `${this.url}/getClientInfoForSalesInfo`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE: RESPONSE DATA: ", response.data);            

            this.sales = response.data;
            this.sales.forEach((el) => {
              el.fileOTPurl = `${this.url}/uploads/${el.fileOTP}`;
              console.log("FileId", el.fileId);
              if (
                el.fileOTP === "" ||
                el.fileId === "" ||
                el.fileBank === "" ||
                el.filePaySlip === "" ||
                el.fileFica === ""
              ) {
                el.iconColor = "red";
              } else {
                el.iconColor = "green";
              }
            });            
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
      let targetValue = event.currentTarget.id;
      console.log(targetValue);
      let data = {
        id: targetValue,
      };
      await axios({
        method: "post",        
        url: `${this.url}/deleteSalesRecord`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE: RESPONSE DATA: ", response.data);
            this.initialData();
          },
          (error) => {
            console.log("the Error", error);
          }
        )
        .catch((e) => {
          console.log("THERE IS AN ERROR", e);
        });
    },
    async showFiles(event) {
      let targetVal = event.currentTarget.id;
      console.log("Show Files: ", targetVal);
      this.clientFilesData = this.sales.filter((el) => {
        return el.id === parseInt(targetVal);
      });
      console.log("clientFilesData", this.clientFilesData);
      this.clientFileDialog = true;
    },
    async sendEmail(event) {
      let targetVal = event.currentTarget.id;
      console.log("Email Sale Info, targetID: ", targetVal)
    },
    closeClientForm(event) {
      this.clientDialog = event;
    },
    getClientInfo() {
      this.clientDialog = !this.clientDialog;
    },
    getClientFiles() {
      this.clientFileDialog = !this.clientFileDialog;
    },
    closeClientFiles(event) {
      console.log("THE EVENT", event);
      this.clientFileDialog = event;
    },
  },
};
</script>