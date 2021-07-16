<template>
  <v-container>
    <v-row justify="center">
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
            <v-text-field
              prepend-icon="mdi-magnify"
              placholder="Search"
              label="Search"
              v-model="search"
            ></v-text-field>
            <!-- <v-btn icon @click="dialog = true">
            <v-icon>mdi-text-box-plus</v-icon>
          </v-btn> -->
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

                      <!-- Connor -->
                      <v-btn :id="item.id" text @click="emailItem($event)"
                        ><v-icon color="blue">mdi-email-outline</v-icon></v-btn
                      >

                      <!-- // button for file uploads dialog -->
                      <v-btn :id="item.id" text @click="showFiles($event)"
                        ><v-icon color="black">mdi-eye</v-icon></v-btn
                      >

                      <!-- Build the files Dialog into a seperate component like the clientInfo one -->
                      <!--
                      <v-dialog
                        v-if="clientFiles.length > 0"
                        v-model="dialogfiles"
                        max-width="900px"
                      >
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Client Files</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileOTPlbl"
                                    label="OTP*"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileOTP"
                                    label="OTP link*"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileIdlbl"
                                    label="ID*"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileId"
                                    label="ID/Passport*"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileBanklbl"
                                    label="Bank Statement*"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileBank"
                                    label="Bank link*"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="filePaySliplbl"
                                    label="Payslip/s*"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="filePaySlip"
                                    label="Payslip link*"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileFicalbl"
                                    label="FICA Docs*"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="fileFica"
                                    label="FICA link*"
                                    required
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeClientInfo"
                            >
                              Close
                            </v-btn>
                         
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                       -->

                      <!-- <a :href="item.fileOTPurl" download target style="text-decoration: none;">
                       <v-icon color="red">mdi-file-pdf-box</v-icon>
                    </a> -->
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

      // closeClientFiles: false,
      // object: {
      //   id: "",
      //   firstName: "",
      //   lastName: "",
      //   iDNumber: "",
      //   // bankName: "",
      //   // accountNumber: "",
      //   // accountType: "",
      //   block: "",
      //   unit: "",
      //   fileOTP: "",
      // },
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
    // console.log("Connor", this.$store.state.development.id);
    this.url = this.$store.state.url;
    this.initialData();
    // what kind of data do i push into the axios data: property. the unit obviously uses the developement.id from the store?
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
    emailItem(event) {
      let targetId = event.currentTarget.id;
      console.log(targetId);
      console.log("Email Item SalesEditData = ", this.salesEditData);

      

      this.salesEditData = this.sales.filter((el) => {
        return el.id === parseInt(targetId);
      });
      console.log("salesEditData", this.salesEditData);
      this.clientDialog = true;
    },
    // async checkAllFilesReceived() {
    //   console.log("CheckForAllFiles");
    //   this.clientFilesData = this.sales.filter((el) => {
    //     console.log("Elements of the clientFileData Array", el);
    //     // check the elements if fileOTP has a value then check next file, if any don't have a value then set a boolean to false, which changes the colour of the edit button, it should only remain true if it passes all the checks
    //     //return el.id === parseInt(targetVal);
    //   });
    //   this.clientFilesData.forEach((el2) => {
    //     console.log("Elements of the clientFileData Array", el2);
    //   });
    // },
    async initialData() {
      let data = {
        id: "",
        // id: this.$store.state.development.id,
      };
      await axios({
        method: "post",
        // replace this with global url
        url: `${this.url}/getClientInfoForSalesInfo`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE, Connor RESPONSE DATA", response.data);
            // console.log(response.data);

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
            //this.checkAllFilesReceived();
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
        // replace this with global url
        url: `${this.url}/deleteSalesRecord`,
        data: data,
      })
        .then(
          (response) => {
            console.log("CLIENT-SIDE, Connor RESPONSE DATA", response.data);
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
    //  if (this.fileOPT !== null) {
    //     contains.push("fileOTP");
    //     files.push(this.fileOPT) ; // append mimetype here?
    //   }
    //   if (this.fileId !== null) {
    //     contains.push("fileId");
    //     files.push(this.fileId);
    //   }
    //   if (this.fileBank !== null) {
    //     contains.push("fileBank");
    //     files.push(this.fileBank);
    //   }
    //   if (this.filePaySlip) {
    //     this.filePaySlip.forEach((el) => {
    //       contains.push("filePaySlip");
    //       files.push(el);
    //     });
    //   } else {
    //     console.log("No File");
    //   }

    //   if (this.fileFica) {
    //     this.fileFica.forEach((el) => {
    //       contains.push("fileFica");
    //       files.push(el);
    //     });
    //   } else {
    //     console.log("No File");
    //   }
  },
};
</script>
