<template>
  <div>
    <dl class="row">
      <dt class="col-sm-2">Birthdate</dt>
      <dd class="col-sm-10">
        <p class="my-0">{{ birthdate }}</p>
      </dd>
      <dt class="col-sm-2">Email</dt>
      <dd class="col-sm-10">
        <a v-for="_email in email" :key="_email" :href="'mailto:' + _email">
          <p class="my-0">{{ _email }}</p>
        </a>
      </dd>

      <dt class="col-sm-2">Phone</dt>
      <dd class="col-sm-10">
        <a v-for="_phone in phone" :key="_phone" :href="'tel:' + _phone">
          <p class="my-0">{{ formatPhone(_phone) }}</p>
        </a>
      </dd>

      <dt class="col-sm-2" v-if="address[0].line1 !== ''">Address</dt>
      <dd class="col-sm-10" v-if="address[0].line1 !== ''">
        <p class="my-0" v-for="(_address, index) in address" :key="index">
          {{ _address.line1 }},
          {{ _address.line2 ? _address.line2 + "," : "" }}
          {{ _address.city }} {{ _address.zip }}, {{ _address.state }}
        </p>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return { ...this.selectedContact };
  },
  props: ["selectedContact"],
  methods: {
    formatPhone: function(x) {
      return `(${x.slice(0, 3)}) ${x.slice(3, 6)}-${x.slice(6, 11)}`;
    },
  },
};
</script>
