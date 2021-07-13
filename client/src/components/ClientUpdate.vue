<template>
  <v-container>
    <div class="about">
      <br />  <br />
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="900px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Client Info</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editData[0].firstname"
                      label="First name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editData[0].lastname"
                      label="Last name*"
                      required
                    ></v-text-field>
                  </v-col>
             
                  <v-col cols="12">
                    <v-text-field
                      v-model="editData[0].iDNumber"
                      label="ID Number*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="editData[0].email"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <label><b> Bank Details </b> </label>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editData[0].bankName"
                      label="Bank*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      v-model="editData[0].accountType"
                      :items="['SAVINGS', 'CHEQUE', 'CREDIT']"
                      label="Account Type*"
                      required
                      chips
                    ></v-autocomplete>
                  </v-col>       

                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editData[0].accountNumber"
                      label="Account Number*"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- File Uploads  -->
                  <label> File Uploads </label>
                  <v-col cols="12" sm="12">
                    <v-file-input
                     v-if="editData[0].fileOPT === null || editData[0].fileOPT === ''"
                      v-model="editData[0].fileOPT"
                      label="OPT"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OPT"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-file-input
                    v-if="editData[0].fileId === null || editData[0].fileId === ''"
                      v-model="editData[0].fileId"

                      label="ID/Passport"
                      filled
                      hint="ID/Passport Photo"
                      persistent-hint
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="editData[0].fileBank"
                      label="Bank Statement"
                      filled
                      hint="Bank Statement"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="filePaySlip"
                      label="Payslip"
                      filled
                      multiple
                      hint="Up to 3 payslip pref"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileFica"
                      label="FICA"
                      filled
                      multiple
                      hint="FICA Documents"
                      persistent-hint
                    ></v-file-input>
                  </v-col> -->

                </v-row>
              </v-container>
              <small>*indicates required field</small>
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
              <v-btn 
                color="blue darken-1" 
                text 
                @click="updateClientData"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-snackbar top v-model="snackbar">
        {{ snackBarmessage }}
        <v-btn color="red" text @click="snackbar = false"> Close </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "salesstart",

  props: {
    dialog: Boolean,
    editData: Array,
  },

  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Posted!!",
      // firstName: "",
      // lastName: "",
      // iDNumber: "",
      // email: "",
      // bankName: "",
      // accountNumber: "",
      // accountType: "",
      // fileOPT: null,
      // fileId: null,
      // fileBank: null,
      // filePaySlip: null,
      // fileFica: null,
      url: "",
    };
  },
  mounted() {
    this.url = this.$store.state.url;
    setTimeout(
      () => { console.log("OKAY", this.editData); }, 
      1000);
  },

  methods: {
    closeClientInfo() {
      this.$emit("closeForm", false);
    },
    async updateClientData() {
      // get the form fields data to pass to salesRoutes /updateClient
      let data = {
        thisData: this.editData,
      };

      await axios({
        method: "post",
        url: `${this.url}/updateClient`,
        data: data,
      }).then(
        (response) => {
          console.log(response.data);
          // little box saying 'Posted Successfully
          this.snackbar = true;
          // close the form after completing
          this.closeClientInfo();
        },

        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
