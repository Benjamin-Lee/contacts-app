<template>
  <b-container class="mb-4">
    <b-form @submit="onSubmit" novalidate>
      <!-- Controls -->
      <b-row class="mb-3">
        <b-col class="text-center">
          <b-button
            variant="outline-secondary"
            class="mr-3"
            @click="beforeCancellation"
          >
            Cancel
          </b-button>
          <b-button variant="outline-secondary" class="mr-3" @click="validate"
            >Validate</b-button
          >
          <b-button type="submit" variant="outline-primary">Save</b-button>
        </b-col>
      </b-row>

      <!-- First name input -->
      <b-form-group label="First Name" label-for="input-1">
        <b-form-input
          id="first_name"
          v-model="first_name"
          trim
          required
          :state="showValidation ? first_name.length > 0 : null"
        />
        <b-form-invalid-feedback>
          First name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last name input -->
      <b-form-group label="Last Name" label-for="last_name">
        <b-form-input
          id="last_name"
          v-model="last_name"
          trim
          required
          :state="showValidation ? last_name.length > 0 : null"
        />
        <b-form-invalid-feedback>
          Last name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Birthday input-->
      <b-form-group label="Birthdate">
        <datepicker
          bootstrap-styling
          typeable
          required
          placeholder="MM/DD/YYYY"
          v-model="_birthdate"
          format="MM/dd/yyyy"
          :input-class="{ 'is-invalid': showValidation && birthdate === '' }"
        >
          <b-form-invalid-feedback slot="afterDateInput">
            A birthdate is required.
          </b-form-invalid-feedback></datepicker
        >
      </b-form-group>

      <!-- One or more emails -->
      <b-form-group label="Email" class="mb-0">
        <b-form-input
          v-for="(_, index) in email"
          :key="index"
          v-bind:class="{ 'mb-3': index !== email.length - 1 }"
          type="email"
          v-model="email[index]"
          required
          :state="showValidation ? email[index].length > 0 : null"
        />
        <b-form-invalid-feedback>
          At least one email is required.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-col class="text-center">
        <b-button
          variant="link"
          @click="email.pop()"
          :disabled="email.length === 1"
        >
          -
        </b-button>
        <b-button variant="link" @click="email.push('')">
          +
        </b-button>
      </b-col>

      <!-- One of more phone numbers -->
      <b-form-group label="Phone" class="mt-0">
        <b-form-input
          v-for="(_, index) in phone"
          :key="index"
          v-bind:class="{ 'mb-3': index !== phone.length - 1 }"
          type="tel"
          required
          v-model="phone[index]"
          :state="showValidation ? phone[index].length === 10 : null"
        />
        <b-form-invalid-feedback>
          At least one phone number is required.
        </b-form-invalid-feedback>
        <b-col class="text-center">
          <b-button
            variant="link"
            @click="phone.pop()"
            :disabled="phone.length === 1"
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
        <b-col cols="12" class="mb-2">Address</b-col>
        <b-col class="pl-2 pr-3">
          <b-row
            v-for="(_address, index) in address"
            :key="index"
            v-bind:class="{ 'mb-3': index !== address.length - 1 }"
          >
            <b-col>
              <b-card>
                <b-form-group label="Line 1" label-for="nested-street">
                  <b-form-input id="nested-street" :value="_address.line1" />
                </b-form-group>
                <b-form-group label="Line 2" label-for="nested-street">
                  <b-form-input id="nested-street" :value="_address.line2" />
                </b-form-group>
                <b-form-group label="City" label-for="nested-city">
                  <b-form-input id="nested-city" :value="_address.city" />
                </b-form-group>

                <b-form-group label="State" label-for="nested-state">
                  <b-form-input id="nested-state" :value="_address.state" />
                </b-form-group>
                <b-form-group label="Zip" label-for="nested-state" class="mb-0">
                  <b-form-input id="nested-state" :value="_address.zip" />
                </b-form-group>
              </b-card>
            </b-col>
          </b-row>
          <b-col class="text-center">
            <b-button
              variant="link"
              @click="address.pop()"
              :disabled="address.length === 1"
            >
              -
            </b-button>
            <b-button variant="link" @click="address.push({})">
              +
            </b-button>
          </b-col>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: { Datepicker },
  props: {
    contact: {
      default: () => {
        return {
          first_name: "",
          last_name: "",
          email: [""],
          phone: [""],
          birthdate: "",
          address: [{ line1: "", line2: "", city: "", state: "", zip: "" }],
        };
      },
      type: Object,
    },
  },
  data() {
    return {
      showValidation: false,
      ...this.contact,
    };
  },
  computed: {
    _birthdate: {
      get() {
        // override the defauly birthdate
        if (this.birthdate.length !== 10) {
          return "";
        }

        // extract the birthdate
        let year = this.birthdate.slice(0, 4);
        let month = this.birthdate.slice(6, 7);
        let date = this.birthdate.slice(8, 10);

        // convert it to a Date
        return new Date(year, month - 1, date);
      },

      set(x) {
        // turn the Date object back into an ISO string
        if (x == null) {
          this.birthdate = "";
          return;
        }
        this.birthdate = x.toISOString().slice(0, 10);
      },
    },
  },
  methods: {
    beforeCancellation() {
      this.$bvModal
        .msgBoxConfirm(
          "Are you sure you want to go back? No changes will be saved!",
          {
            okVariant: "outline-danger",
            cancelVariant: "outline-secondary",
          }
        )
        .then(value => {
          if (value) {
            this.$router.push("/");
          }
        });
    },

    validate() {
      this.showValidation = !this.showValidation;
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
  },
  mounted() {
    // remove a class that shouldn't be there
    // when used with a slot, it results in square corners on the input
    document
      .getElementsByClassName("vdp-datepicker")[0]
      .firstElementChild.classList.remove("input-group");
  },
};
</script>
