<template>
  <b-container>
    <b-form>
      <!-- First name input -->
      <b-form-group label="First Name" label-cols-sm="3" label-for="input-1">
        <b-form-input id="first_name" v-model="first_name" trim></b-form-input>
      </b-form-group>

      <!-- Last name input -->
      <b-form-group label="Last Name" label-cols-sm="3" label-for="last_name">
        <b-form-input id="last_name" v-model="last_name" trim></b-form-input>
      </b-form-group>

      <!-- One or more emails -->
      <b-form-group label="Email" label-cols-sm="3" class="mb-0">
        <!-- Only use the mb-3 padding if its not the last input -->
        <b-input-group
          v-for="(_email, index) in email"
          :key="_email"
          v-bind:class="{ 'mb-3': index != email.length - 1 }"
        >
          <b-form-input type="email" :value="_email"></b-form-input>
        </b-input-group>
        <b-col class="text-center">
          <b-button
            variant="link"
            @click="email.pop(_email)"
            :disabled="email.length == 1"
          >
            -
          </b-button>
          <b-button variant="link" @click="email.push('')">
            +
          </b-button></b-col
        >
      </b-form-group>

      <!-- One of more phone numbers -->
      <b-form-group label="Phone" label-cols-sm="3" class="mt-0">
        <b-input-group
          v-for="(_phone, index) in phone"
          :key="_phone"
          v-bind:class="{ 'mb-3': index != phone.length - 1 }"
        >
          <b-form-input type="tel" :value="_phone"></b-form-input>
        </b-input-group>
        <b-col class="text-center">
          <b-button
            variant="link"
            @click="phone.pop(_phone)"
            :disabled="phone.length == 1"
          >
            -
          </b-button>
          <b-button variant="link" @click="phone.push('')">
            +
          </b-button>
        </b-col>
      </b-form-group>

      <!-- Zero or more addresses -->
      <b-row>
        <b-col sm="3">Address</b-col>
        <b-col class="pl-2 pr-3">
          <b-row>
            <b-col>
              <b-card>
                <b-form-group
                  label-cols-sm="3"
                  label="Line 1"
                  label-for="nested-street"
                >
                  <b-form-input id="nested-street"></b-form-input>
                </b-form-group>
                <b-form-group
                  label-cols-sm="3"
                  label="Line 2"
                  label-for="nested-street"
                >
                  <b-form-input id="nested-street"></b-form-input>
                </b-form-group>
                <b-form-group
                  label-cols-sm="3"
                  label="City"
                  label-for="nested-city"
                >
                  <b-form-input id="nested-city"></b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="State"
                  label-for="nested-state"
                  class="mb-0"
                >
                  <b-form-input id="nested-state"></b-form-input>
                </b-form-group>
              </b-card>
              <b-col class="text-center">
                <b-button
                  variant="link"
                  @click="address.pop(_address)"
                  :disabled="address.length == 1"
                >
                  -
                </b-button>
                <b-button variant="link" @click="address.push({})">
                  +
                </b-button>
              </b-col>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <!-- <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
  </b-container>
</template>

<script>
export default {
  props: {
    contact: {
      default: () => {
        return { first_name: "", last_name: "", email: [""], phone: [""] };
      },
      type: Object,
    },
  },
  data() {
    return { ...this.contact };
  },
};
</script>
