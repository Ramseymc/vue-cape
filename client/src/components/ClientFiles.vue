<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
      <v-row justify="center">
        <v-dialog         
          v-model="dialogFiles"
          max-width="400px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Client Files</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                    <!-- change to labels -->
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="fileOTPlbl"
                      label="OTP*"
                      required
        
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="2" md="2">
                    <a :href="fileData[0].fileOTP" 
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="fileIdlbl"
                      label="ID*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <a :href="fileData[0].fileId" 
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="black">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="fileBanklbl"
                      label="Bank Statement*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <a :href="fileData[0].fileBank" 
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="orange">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="filePaySliplbl"
                      label="Payslip/s"
                      required
                    ></v-text-field>
                  </v-col>

                   

                  <v-col cols="12" sm="6" md="6">
                    <a :href="fileData[0].filePaySlip" 
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="blue">mdi-file-pdf-box</v-icon>
                    </a>

                    <!-- <v-text-field
                      v-model="filePaySlip"
                      :label="fileData[0].filePaySlip"
                      required
                    ></v-text-field> -->
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="fileFicalbl"
                      label="FICA Docs*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <a :href="fileData[0].fileFica" 
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="purple">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeClientFiles">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import axios from "axios";
export default {
  name: "clientfiles",

  props: {
    dialogFiles: Boolean,
    fileData: Array    
  },
  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Posted!!",
    //   firstName: "Connor",
    //   lastName: "McLean",
    //   iDNumber: "9308175039088",
    //   email: "test@gmail.com",
    //   bankName: "CAPITEC",
    //   accountNumber: "1234567890",
    //   accountType: "SAVINGS",
    //   fileOPT: null,
    //   fileId: null,
    //   fileBank: null,
    //   filePaySlip: null,
    //   fileFica: null,
      url: "",
    };
  },
  mounted() {
    this.url = this.$store.state.url;
    setTimeout(() => {
      console.log("OKAY", this.fileData);
    }, 1000);
  },
  methods: {
    closeClienFiles() {
      this.$emit("closeForm", false);
    },
  },
};
</script>