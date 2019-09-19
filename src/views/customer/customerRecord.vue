<!-- 跟进记录 -->
<template>
  <div class>
    <Record :record="record"></Record>
  </div>
</template>

<script>
import Record from "@components/Record.vue";
import Api from "@api";
export default {
  name: "customerRecord",
  components: { Record },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      record: []
    };
  },
  props: {},
  mounted() {
    Api.queryCustomerFollowUpRecord({
      customerId: this.id
    }).then(res => {
      this.record = res.data;
    });
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>