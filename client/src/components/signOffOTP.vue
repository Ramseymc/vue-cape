<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
      <v-row justify="center">
        <v-dialog v-model="dialogFiles" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Sign Off OTP</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="3"
                    sm="3"
                    md="3"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <span>Signed OTP</span>
                  </v-col>

                  <!-- this will be a new file upload for fileOTP -->
                  <v-col
                    cols="8"
                    sm="7"
                    md="7"
                    lg="9"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>

                    <v-file-input
                      v-model="fileOTP"
                      label="Upload OTP"
                      accept="image/png, image/jpeg, image/bmp, image/jpg, application/pdf"
                      filled
                      hint="OTP"
                      persistent-hint
                    ></v-file-input>

                    <!-- <a
                      :href="`http://localhost:3000/uploads/${fileData[0].fileOTP}`"
                      download
                      target
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a> -->
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSignOffForm">
                Close
              </v-btn>
              <v-btn
                text
                @click="updateClientOTP"
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
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "signoffotp",

  props: {
    dialogFiles: Boolean,
    fileData: Array,
  },
  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Signed Off!",
      url: "",
      arrFicaFiles: [],
      arrPaySlipFiles: [],
    };
  },

  methods: {
    async updateClientOTP() {
      let formData = new FormData();
        console.log("filedata=", this.fileData[0]);
        console.log("fileOTP=", this.fileOTP);
        // i am missing the file uploading, and i should use this.fileData[0].id as the id and the new filename as the name 

      if (this.fileData[0].fileOTP !== null) {
        formData.append("fileOTP", this.fileData[0].fileOTP);
      }
      await axios({
        method: "post",
        url: `${this.url}/updateClientOTP`,
        data: this.fileData[0],
      }).then(
        (response) => {
          console.log(response.data);

          this.snackbar = true;
          console.log("SignOff.vue - closing form");
          // close the form after completing
          this.closeSignOffForm();
        },

        (error) => {
          console.log(error);
        }
      );
    },
    closeSignOffForm() {
      this.$emit("closeForm", false);
    },
  },
  mounted() {
    this.url = `${this.$store.state.url}`;
    console.log("ClientUpdate Mounted EditData= ", this.fileData[0]);
    // //THIS A THOUGHT -  THEN POPULATE NTO A LOOP (YOU MAY NEED A FEW ANCHOR TAGS)
    // let ficaSplit = this.fileData[0].fileFica;
    // try {
    //   //ficaSplit.split(",");
    //   this.arrFicaFiles = ficaSplit.split(","); // set local array
    //   this.arrFicaFiles = Array.from(new Set(this.arrFicaFiles))  // removes duplicates
    // } catch {
    //   this.arrFicaFiles.push(this.fileData[0].fileFica)
    //   console.log("Cannot split this item, pushing single file");
    // }
    // // RamseyMc now to use the array in a v-for ?
    // console.log("ficaSplit = ", ficaSplit);
    // console.log("fileData = ", this.fileData[0]);
    // console.log("Testing: fileFica split to show multiple docs", ficaSplit);
    // console.log("this.arrFicaFiles = ", this.arrFicaFiles);

    // let paySlipSplit = this.fileData[0].filePaySlip;
    // try {
    //   //paySlipSplit.split(",");
    //   this.arrPaySlipFiles = paySlipSplit.split(","); // set local array
    //   this.arrPaySlipFiles = Array.from(new Set(this.arrPaySlipFiles))  // removes duplicates
    // } catch {
    //   this.arrPaySlipFiles.push(this.fileData[0].filePaySlip)
    //   console.log("Cannot split this item, pushing single file");
    // }
    // // RamseyMc now to use the array in a v-for ?
    // console.log("Testing: filePaySlip split to show multiple docs",paySlipSplit);
    // console.log("this.arrPaySlipFiles = ", this.arrPaySlipFiles);

    // // RamseyMc - the array is correct, how would you use it's size to dynamically build a <ul><li> with anchor tags here </li></ul> using a v-for loop?
    // // I am currently busy doing that

    setTimeout(() => {
      console.log("ClientFiles: ", this.fileData);
    }, 4000);
  },
};
</script>
