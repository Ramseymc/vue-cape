<template>
  <v-container>
    <div class="about">
      <br /><br /><br />
      <v-row justify="center">
        <v-dialog v-model="dialogFiles" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Client Files</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <span>OTP</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileOTP !== null &&
                      fileData[0].fileOTP !== '' &&
                      fileData[0].fileOTP !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`http://localhost:3000/uploads/${fileData[0].fileOTP}`"
                      download
                      target
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileId !== null &&
                      fileData[0].fileId !== '' &&
                      fileData[0].fileId !== 'undefined'
                    "
                  >
                    <span>ID/Passport</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileId !== null &&
                      fileData[0].fileId !== '' &&
                      fileData[0].fileId !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`http://localhost:3000/uploads/${fileData[0].fileId}`"
                      download
                      target
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>
                  
                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileBank !== null &&
                      fileData[0].fileBank !== '' &&
                      fileData[0].fileBank !== 'undefined'
                    "
                  >
                    <span>Bank Statement</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileBank !== null &&
                      fileData[0].fileBank !== '' &&
                      fileData[0].fileBank !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`http://localhost:3000/uploads/${fileData[0].fileBank}`"
                      download
                      target
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].filePaySlip !== null &&
                      fileData[0].filePaySlip !== '' &&
                      fileData[0].filePaySlip !== 'undefined'
                    "
                  >
                    <span>Payslip</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].filePaySlip !== null &&
                      fileData[0].filePaySlip !== '' &&
                      fileData[0].filePaySlip !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>
                    <a
                      :href="`http://localhost:3000/uploads/${fileData[0].filePaySlip}`"
                      download
                      target
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                    v-if="
                      fileData[0].fileFica !== null &&
                      fileData[0].fileFica !== '' &&
                      fileData[0].fileFica !== 'undefined'
                    "
                  >
                    <span>FICA</span>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                    v-if="
                      fileData[0].fileFica !== null &&
                      fileData[0].fileFica !== '' &&
                      fileData[0].fileFica !== 'undefined'
                    "
                  >
                    <v-spacer></v-spacer>

                    <a
                      :href="`http://localhost:3000/uploads/${fileData[0].fileFica}`"
                      download
                      target
                      style="text-decoration: none"
                    >
                      <v-icon color="green">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <!-- 
                  <v-col cols="12" sm="8" md="8" 
                    v-model="fileData[0].fileId"
                    v-if="fileData[0].fileId !== null || fileData[0].fileId !== '' || fileData[0].fileId !== undefined"
                  >
                 
                    <span>ID/Passport </span> 
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <a :href="fileData[0].fileId" 
                        v-if="fileData[0].fileId !== null || fileData[0].fileId !== '' || fileData[0].fileId !== undefined"
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="black">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col cols="12" sm="8" md="8" 
                    v-model="fileData[0].fileBank"
                    v-if="fileData[0].fileBank !== null || fileData[0].fileBank !== '' || fileData[0].fileBank !== undefined"
                  >
                    <span>Bank Statement</span>
                  </v-col>                  
                  <v-col cols="12" sm="2" md="2">
                    <a :href="fileData[0].fileBank" 
                        v-if="fileData[0].fileBank !== null || fileData[0].fileBank !== '' || fileData[0].fileBank !== undefined"
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="orange">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>

                  <v-col cols="12" sm="8" md="8" 
                    v-model="fileData[0].filePaySlip"
                    v-if="fileData[0].filePaySlip !== null || fileData[0].filePaySlip !== '' || fileData[0].filePaySlip !== undefined"
                  >
                    <span>Payslip/s</span>
                  </v-col>                   
                  <v-col cols="12" sm="2" md="2">
                    <a :href="fileData[0].filePaySlip" 
                        v-if="fileData[0].filePaySlip !== null || fileData[0].filePaySlip !== '' || fileData[0].filePaySlip !== undefined"
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="blue">mdi-file-pdf-box</v-icon>
                    </a>                  
                  </v-col>

                  <v-col cols="12" sm="8" md="8" 
                    v-model="fileData[0].fileFica"
                    v-if="fileData[0].fileFica !== null || fileData[0].fileFica !== '' || fileData[0].fileFica !== undefined"
                  >
                    <span> FICA Files </span>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <a :href="fileData[0].fileFica" 
                        v-if="fileData[0].fileFica !== null || fileData[0].fileFica !== '' || fileData[0].fileFica !== undefined"
                        download 
                        target 
                        style="text-decoration: none;">
                    <v-icon color="purple">mdi-file-pdf-box</v-icon>
                    </a>
                  </v-col>
 -->
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
    fileData: Array,
  },
  data() {
    return {
      snackbar: false,
      snackBarmessage: "Successfully Posted!!",
      url: "",
    };
  },
  methods: {
    closeClientFiles() {
      this.$emit("closeForm", false);
    },
  },
  mounted() {
    this.url = `${this.$store.state.url}/uploads/`;

    // THIS A THOUGHT -  THEN POPULATE NTO A LOOP (YOU MAY NEED A FEW ANCHOR TAGS)
    // let test = this.fileData[0].fileFica
    // try {
    //   test.split(",")
    // } catch {
    //   console.log("Cannot split this item")
    // }
    // console.log(test.length)

    // el.fileFica = 

    setTimeout(() => {
      console.log("ClientFiles: ", this.fileData);
    }, 4000);
  },
};
</script>
