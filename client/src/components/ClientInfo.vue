<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
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
                      v-model="firstName"
                      label="First name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="lastName"
                      label="Last name*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="iDNumber"
                      label="ID Number*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <label><b> Bank Details </b> </label>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="bankName"
                      label="Bank*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      v-model="accountType"
                      :items="['SAVINGS', 'CHEQUE', 'CREDIT']"
                      label="Account Type*"
                      required
                      chips
                    ></v-autocomplete>
                  </v-col>
                  <!-- <v-text-field
                      v-model="accountType"
                      label="Account Type*"
                      required
                    ></v-text-field>
                  </v-col> -->

                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="accountNumber"
                      label="Account Number*"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- Mood -->
                  <v-col cols="6" sm="6">
                    <medium><b>Mood</b></medium>
                    <v-radio-group v-model="mood">
                      <v-radio
                        label="Mood 1"
                        color="black"
                        value="Mood1"
                      ></v-radio>
                      <v-radio
                        label="Mood 2"
                        color="red darken-3"
                        value="Mood2"
                      ></v-radio>
                      <!-- <v-radio
                      v-for="n in 3"
                      :key="n"
                      :label="`Mood ${n}`"
                      :value="n"
                    ></v-radio> -->
                    </v-radio-group>
                    <small>*indicates required field</small>
                  </v-col>

                  <!-- Flooring -->
                  <v-col cols="6" sm="6">
                    <medium><b>Flooring</b></medium>
                    <v-radio-group v-model="flooring">
                      <v-radio
                        label="Tiles"
                        color="black"
                        value="Tiles"
                      ></v-radio>
                      <v-radio
                        label="Laminate"
                        color="brown"
                        value="Laminate"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>

                  <label> File Uploads </label>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileOTP"
                      label="OPT"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileId"
                      label="ID/Passport"
                      filled
                      hint="ID/Passport Photo"
                      persistent-hint
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="fileBank"
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
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="closeClientInfo"
                color="primary"
                elevation="3"
                outlined
                rounded
              >
                Close
              </v-btn>
              <v-btn
                text
                @click="insertClientData"
                color="primary"
                elevation="3"
                outlined
                rounded
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
    blockValue: String,
    unitValue: String,
    saleId: String,
  },

  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Posted!!",
      firstName: "",
      lastName: "",
      iDNumber: "",
      email: "",
      bankName: "",
      accountNumber: "",
      accountType: "",
      mood: "",
      flooring: "",
      fileOTP: null,
      fileId: null,
      fileBank: null,
      filePaySlip: null,
      fileFica: null,
      url: "",
    };
  },
  mounted() {
    this.url = this.$store.state.url;
  },

  methods: {
    closeClientInfo() {
      this.$emit("closeForm", false);
    },
    async insertClientData() {
      console.log(this.firstName);
      let files = [];
      let contains = [];
      if (this.fileOTP !== null) {
        contains.push("fileOTP");
        files.push(this.fileOTP); // append mimetype here?
      }
      if (this.fileId !== null) {
        contains.push("fileId");
        files.push(this.fileId);
      }
      if (this.fileBank !== null) {
        contains.push("fileBank");
        files.push(this.fileBank);
      }
      if (this.filePaySlip) {
        this.filePaySlip.forEach((el) => {
          contains.push("filePaySlip");
          files.push(el);
        });
      } else {
        console.log("No File");
      }

      if (this.fileFica) {
        this.fileFica.forEach((el) => {
          contains.push("fileFica");
          files.push(el);
        });
      } else {
        console.log("No File");
      }

      let formData = new FormData();
      for (var x = 0; x < files.length; x++) {
        formData.append("documents", files[x]);
      }
      console.log("formData = ", formData);
      // formData.append("documents", files)
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("iDNumber", this.iDNumber);
      formData.append("email", this.email);
      formData.append("bankName", this.bankName);
      formData.append("accountNumber", this.accountNumber);
      formData.append("accountType", this.accountType);
      formData.append("block", this.blockValue);
      formData.append("unit", this.unitValue);
      formData.append("mood", this.mood);
      formData.append("flooring", this.flooring);
      formData.append("contains", contains);

      await axios({
        method: "post",
        url: `${this.url}/createClient`,
        data: formData,
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
