<template>
  <!-- CRM 3: Fix centering on this page -->
  <!-- <v-container> -->
  <!-- <div class="wrapper"> -->
  <!-- <v-row justify="center" persistent max-width="900px"> -->

  <!-- <div class="center">
      <pre> -->
  <div>
    <!-- </div> -->
    <ClientInfo
      :blockValue="blockValue"
      :unitValue="unitValue"
      :dialog="clientDialog"
      @closeForm="closeClientForm"
    />
    <!-- </v-row> -->
    <!-- </div> -->

    <!-- </v-container> -->
    <!-- </div> -->

    <!-- <div> -->
    <v-card class="mx-auto" max-width="100vw">
      <!-- <template slot="progress">
        <v-progress-linear
          color="#bc9654"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template> -->
      <v-img height="350" :src="flatPic"></v-img>

      <v-card-title>Choose your options</v-card-title>

      <v-card-text>
        <div style="display: flex">
          <v-autocomplete
            v-model="blockValue"
            :items="blocks"
            dense
            filled
            item-text="subsectionName"
            label="Choose Block"
            @change="chooseUnit"
          ></v-autocomplete>
        </div>
        <div>
          <v-autocomplete
            v-model="unitValue"
            :items="items"
            dense
            filled
            item-text="unitName"
            label="Choose Unit"
          ></v-autocomplete>
        </div>

        <!--     
        <v-stepper alt-labels non-linear>
          <v-stepper-header>
            <v-stepper-step step="1" complete color="red"> OTP </v-stepper-step>

            <v-divider></v-divider>
            
            <v-stepper-step
              step="2"
              color="amber"
              editable
              :complete="bondApproved"
              @click="bondApproval"
            >
              Bond Approved
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="3"
              color="green"
              editable
              :complete="documentsSigned"
              @click="docsSigned"
            >
              Final Docs Signed
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper> -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <div> -->
        <!-- <v-spacer></v-spacer> -->
        <v-btn
          v-if="blockValue && unitValue"
          text
          @click="getClientInfo"
          color="primary"
          elevation="3"
          large
          outlined
          rounded
          >Create Sale</v-btn
        >
        <!-- </div> -->
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-divider class="mx-4"></v-divider>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ClientInfo from "../components/ClientInfo.vue";
// let url = process.env.VUE_APP_BASEURL;//From .env File(.env must be in src folder. BTW when you change the .env file you need to restart the server)
export default {
  name: "salesstart",
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
    };
  },
  async mounted() {
    // console.log("Checking ID");
    // console.log("Checking ID2");
    // console.log("Connor", this.$store.state.development.id);

    let data = {
      id: this.$store.state.development.id,
    };
    await axios({
      method: "post",
      url: `http://localhost:3000/getblocksForOptions`,
      data: data,
    })
      .then(
        (response) => {
          console.log(response.data);
          this.blocks = response.data;
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
    async chooseUnit() {
      let filteredData = this.blocks.filter((el) => {
        return el.subsectionName === this.blockValue;
      });
      let data = {
        id: this.$store.state.development.id,
        subsection: filteredData[0].id,
        subsectionName: filteredData[0].subsectionName,
        //subsectionName:
      };
      console.log("filteredData for getting subsectionname:", filteredData),
        await axios({
          method: "post",
          url: `http://localhost:3000/getUnitsForOptions`,
          data: data,
        })
          .then(
            (response) => {
              let filteredData = response.data.filter((el) => {
                return el.unitName.substring(2, 1) !== ".";
              });
              this.items = filteredData;
            },
            (error) => {
              console.log(error);
            }
          )
          .catch((e) => {
            console.log(e);
          });
    },
  },
};
</script>

<style scoped>
.img {
  padding: 20px 20px 20px 0;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.centerimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
.auto {
  padding: 5px 5px 5px 5px;
}
</style>
