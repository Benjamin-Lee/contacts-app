<template>
  <div>
    <dl class="row">
      <dt class="col-sm-2">Birthdate</dt>
      <dd class="col-sm-10">{{ birthdate }}</dd>
    </dl>
    <dl class="row">
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

      <template v-if="address[0].line1 !== ''">
        <dt class="col-sm-2">Address</dt>
        <dd class="col-sm-10">
          <p class="my-0">
            {{ address[0].line1 }},
            {{ address[0].line2 ? address[0].line2 + "," : "" }}
            {{ address[0].city }} {{ address[0].zip }}, {{ address[0].state }}
          </p>
        </dd>
      </template>
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
