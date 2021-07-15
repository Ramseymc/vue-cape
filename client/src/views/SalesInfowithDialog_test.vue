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
            <!-- <v-btn icon @click="dialog = true">
            <v-icon>mdi-text-box-plus</v-icon>
          </v-btn> -->
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group active-class="blue--text" multiple>
              <template v-for="item in sales">
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
                        ><v-icon color="green"
                          >mdi-file-document-edit</v-icon
                        ></v-btn
                      >
                      <!-- // button for file uploads dialog -->
                      <v-btn :id="item.id" text @click="showFiles($event)"
                        ><v-icon color="yellow"
                          >mdi-file-document-edit</v-icon
                        ></v-btn
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
  </v-container>
</template>

<script>
import axios from "axios";
import ClientUpdate from "../components/ClientUpdate.vue";

// let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)
export default {
  name: "salesinfo",
  //name: "apartment",
  components: {
    ClientUpdate,
  },
  data() {
    return {
      blockValue: null, //From Dropdown
      unitValue: null,
      flatPic: require("../assets/unfurnished-flat.jpg"),
      items: [],
      blocks: [],
      clientDialog: false,
      clientFileDialog: false,
      dialog: null,
      dialogfiles: null,
      el: "#v-for-object",
      sales: [],
      url: "",
      salesEditData: [],
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
  async mounted() {
    // console.log("Connor", this.$store.state.development.id);
    this.url = this.$store.state.url;
    this.initialData();
    // what kind of data do i push into the axios data: property. the unit obviously uses the developement.id from the store?
  },
  methods: {
    editItem(event) {
      let targetId = event.currentTarget.id;
      console.log(targetId);
      this.salesEditData = this.sales.filter((el) => {
        return el.id === parseInt(targetId);
      });
      console.log("salesEditData", this.salesEditData);
      this.clientDialog = true;
    },
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
      let targetId = event.currentTarget.id;
      console.log(targetId);
      this.clientFiles = this.sales.filter((el) => {
        return el.id === parseInt(targetId);
      });
      console.log("clientFiles", this.clientFiles);
      this.clientFileDialog = true;
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
  },
};
</script>
