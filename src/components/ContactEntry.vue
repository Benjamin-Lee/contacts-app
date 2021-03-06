<template>
  <b-container class="mb-4">
    <b-form @submit="onSubmit">
      <!-- First name input -->
      <b-form-group label="First Name" label-for="input-1">
        <b-form-input
          v-model="first_name"
          trim
          required
          :state="showValidation && first_name.length < 1 ? false : null"
        />
        <b-form-invalid-feedback>
          First name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last name input -->
      <b-form-group label="Last Name" label-for="last_name">
        <b-form-input
          v-model="last_name"
          trim
          required
          :state="showValidation && last_name.length < 1 ? false : null"
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
          trim
          :state="showValidation && email[index].length < 1 ? false : null"
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
          trim
          pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
          v-model="phone[index]"
          :state="showValidation && phone[index].length < 10 ? false : null"
        />
        <b-form-invalid-feedback>
          At least one phone number with area code is required.
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
            v-for="(_, index) in address"
            :key="index"
            v-bind:class="{ 'mb-3': index !== address.length - 1 }"
          >
            <b-col>
              <b-card>
                <b-form-group label="Line 1">
                  <b-form-input v-model="address[index].line1" trim />
                </b-form-group>
                <b-form-group label="Line 2">
                  <b-form-input v-model="address[index].line2" trim />
                </b-form-group>
                <b-form-group label="City">
                  <b-form-input v-model="address[index].city" trim />
                </b-form-group>

                <b-form-group label="State">
                  <b-form-input v-model="address[index].state" trim />
                </b-form-group>
                <b-form-group label="Zip" class="mb-0">
                  <b-form-input v-model="address[index].zip" trim />
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
          <b-button
            v-if="$route.path == '/edit'"
            variant="outline-danger"
            class="mr-3"
            @click="deleteContact"
          >
            Delete
          </b-button>
          <b-button
            type="submit"
            variant="outline-primary"
            @click="showValidation = true"
          >
            Save
          </b-button>
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
      showValidation: false, // determines whether to show the bootstrap form feedback
      ...this.contact,
    };
  },
  computed: {
    // We need an interface between <Datepicker>'s date representation (Date) and Firebase's (ISO date)
    _birthdate: {
      get() {
        // override the default birthdate to just leave it blank
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
        // turn the Date object back into an ISO string if its not empty
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
            centered: true,
          }
        )
        .then(value => {
          if (value) {
            this.$router.push("/");
          }
        });
    },
    onSubmit(evt) {
      // prevent the default form behavior
      evt.preventDefault();

      // create the object we'll insert into the db
      let contact = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone.map(number =>
          [...number].filter(x => !isNaN(x)).join("")
        ),
        birthdate: this.birthdate,
        address: this.address,
      };

      // we need a different action depending on which route we're using
      if (this.$route.path === "/new") {
        this.$store
          .dispatch("createContact", contact)
          .then(this.$router.push("/"));
      } else if (this.$route.path === "/edit") {
        this.$store
          .dispatch("overwriteContact", {
            contactID: this.$attrs.id,
            contact: contact,
          })
          .then(this.$router.push("/"));
      }
    },
    deleteContact() {
      this.$bvModal
        .msgBoxConfirm(
          "Are you sure you want to delete this contact? It is permanent!",
          {
            okVariant: "outline-danger",
            cancelVariant: "outline-secondary",
            centered: true,
          }
        )
        .then(value => {
          if (value) {
            this.$store.dispatch("deleteContact", this.$attrs.id);
            this.$router.push("/");
          }
        });
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
