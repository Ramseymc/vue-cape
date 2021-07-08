<template>
 <v-container>
  <div class="about">
    
    <br><br><br>
   
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Client Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"  sm="6" md="6" >
                <v-text-field
                  label="First name*"
                  required
                ></v-text-field>
              </v-col>         
              <v-col cols="12"  sm="6" md="6" >
                <v-text-field
                  label="Last name*"                                    
                  required
                ></v-text-field>
              </v-col>                            
               <!--
                   <v-col   cols="12"    >
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                   </v-col>
                -->
                       
              <v-col   cols="12"  >
              <v-text-field
                  label="ID Number*"               
                  required
                ></v-text-field>          
              </v-col>

               <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>

                  <!--
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              -->

               <v-col cols="12"  >
               <large><b> Bank Details </b> </large>
              </v-col>

           
              <v-col cols="12"  sm="6"  >
                <v-text-field
                  label="Bank*"               
                  required
                ></v-text-field>
              </v-col>

              <v-col  cols="12" sm="6"  >
                <v-text-field
                  label="Branch Code*"               
                  required
                ></v-text-field>
              </v-col>

              <v-col  cols="12" sm="8"  >
                <v-text-field
                  label="Account Number*"               
                  required
                ></v-text-field>
              </v-col>
               <v-col  cols="12" sm="4" >
                <v-text-field
                  label="Account Type*"               
                  required
                ></v-text-field>
              </v-col>

              <medium> File Uploads </medium>
              <v-col cols="12" sm="12">
                <v-file-input
                  label="POD"
                  filled
                  hint="POD"
                  persistent-hint
                ></v-file-input>     
              </v-col>

              <v-col  cols="12" sm="12" >
                <v-file-input
                  label="ID/Passport"
                  filled
                  hint="ID/Passport Photo"
                  persistent-hint
                  prepend-icon="mdi-camera"
                ></v-file-input>     
              </v-col>

              <v-col cols="12" sm="12">
                <v-file-input
                  label="Bank Statement"
                  filled
                  hint="Bank Statement"
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
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
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
export default {
  name: "salesstart",
  data() {
    return {
      dialog: true   
    }
  }
}
</script>