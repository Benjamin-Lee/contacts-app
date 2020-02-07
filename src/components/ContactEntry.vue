<template>
  <b-container>
    <b-form-group
      id="fieldset-1"
      label="First Name"
      label-cols-sm="3"
      label-for="input-1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
      <b-form-input
        id="input-1"
        v-model="name"
        :state="state"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-1"
      label="Last Name"
      label-cols-sm="3"
      label-for="input-1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
      <b-form-input
        id="input-1"
        v-model="name"
        :state="state"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Email" label-cols-sm="3">
      <b-form-input type="email"></b-form-input>
      <b-input-group class="mt-3">
        <b-form-input type="email" :state="false"></b-form-input>
      </b-input-group>
      <b-col class="text-center">
        <b-button variant="link">Add Another</b-button>
      </b-col>
    </b-form-group>
    <b-form-group label="Address" label-size="lg" class="mb-0">
      <b-card>
        <b-form-group
          label-cols-sm="3"
          label="Street:"
          label-align-sm="right"
          label-for="nested-street"
        >
          <b-form-input id="nested-street"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="City:"
          label-align-sm="right"
          label-for="nested-city"
        >
          <b-form-input id="nested-city"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="State:"
          label-align-sm="right"
          label-for="nested-state"
        >
          <b-form-input id="nested-state"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Country:"
          label-align-sm="right"
          label-for="nested-country"
        >
          <b-form-input id="nested-country"></b-form-input>
        </b-form-group>
        <b-col class="text-center">
          <b-button variant="link">Add Another</b-button>
        </b-col>
      </b-card>
    </b-form-group>
  </b-container>
</template>

<script>
export default {};
</script>
