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

                  <!-- PaySlip -->
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
                    <!-- <span>Payslip</span> -->
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

                  <!-- FICA  -->
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
                    <!-- <span>FICA</span> -->
                    <span>FICA</span>
                  </v-col>
                  
                  <!-- RamseyMc v-for "files in ficaFiles" with the anchor tags for length of fica  -->
                  <!-- <ul :v-for="id in this.arrFicaFiles" :key="fileData[0].id"> -->

                    <ul>
                    <!--  just need it to be an array with a number linked to each file
                    // eg [ {id: 1, file: ea44t6a123u22ij2ub2b86.pdf} , {id: 2, file:42fg234ff4ij2ub2b86.pdf} ]
                    where the id can be used as the key to spit out the branch tags eg
                    :href="`http://localhost:3000/uploads/{${fileDetails.filenName}}`"
                    -->

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
                       <li v-for="(file, index) in this.arrFicaFiles" :key="`file-${index}`">
                        <v-spacer></v-spacer>
                        <a
                          :href="`http://localhost:3000/uploads/${file}`"
                          download
                          target
                          style="text-decoration: none"
                        >
                          <v-icon color="green">mdi-file-pdf-box</v-icon>
                        </a>
                      
                    </li>
                    </v-col>
                    <!--
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
                      </a> -->
                  </ul>

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
      arrFicaFiles: [],
      arrPaySlipFiles: [],
    };
  },
  methods: {
    closeClientFiles() {
      this.$emit("closeForm", false);
    },
  },
  mounted() {
    this.url = `${this.$store.state.url}/uploads/`;
    
    //THIS A THOUGHT -  THEN POPULATE NTO A LOOP (YOU MAY NEED A FEW ANCHOR TAGS)
    let ficaSplit = this.fileData[0].fileFica;
    try {
      //ficaSplit.split(",");
      this.arrFicaFiles = ficaSplit.split(","); // set local array
      this.arrFicaFiles = Array.from(new Set(this.arrFicaFiles))  // removes duplicates 
    } catch {
      this.arrFicaFiles.push(this.fileData[0].fileFica)
      console.log("Cannot split this item, pushing single file");
    }
    // RamseyMc now to use the array in a v-for ?
    console.log("ficaSplit = ", ficaSplit);
    console.log("fileData = ", this.fileData[0]);
    console.log("Testing: fileFica split to show multiple docs", ficaSplit);
    console.log("this.arrFicaFiles = ", this.arrFicaFiles);

    let paySlipSplit = this.fileData[0].filePaySlip;
    try {
      //paySlipSplit.split(",");   
      this.arrPaySlipFiles = paySlipSplit.split(","); // set local array
      this.arrPaySlipFiles = Array.from(new Set(this.arrPaySlipFiles))  // removes duplicates
    } catch {
      this.arrPaySlipFiles.push(this.fileData[0].filePaySlip)
      console.log("Cannot split this item, pushing single file");
    }
    // RamseyMc now to use the array in a v-for ?
    console.log("Testing: filePaySlip split to show multiple docs",paySlipSplit);
    console.log("this.arrPaySlipFiles = ", this.arrPaySlipFiles);

    // RamseyMc - the array is correct, how would you use it's size to dynamically build a <ul><li> with anchor tags here </li></ul> using a v-for loop?
    // I am currently busy doing that

    setTimeout(() => {
      console.log("ClientFiles: ", this.fileData);
    }, 4000);
  },
};
</script>
