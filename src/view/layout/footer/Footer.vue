<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column " id="kt_footer">
    <!--begin::Container-->
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted font-weight-bold mr-2">2021©</span>
        <a
          href="http://www.wiseweb.com.cn/"
          target="_blank"
          class="text-dark-75 text-hover-primary"
          >网智天元</a
        >
      </div>
      <!--end::Copyright-->
      <!--begin::Nav-->
      <div class="nav nav-dark order-1 order-md-2">
        <a
          href="http://www.wiseweb.com.cn/"
          target="_blank"
          class="nav-link pr-3 pl-0"
          >关于</a
        >
        <a
          href="http://www.wiseweb.com.cn/"
          target="_blank"
          class="nav-link px-3"
          >团队</a
        >
        <a
          href="http://www.wiseweb.com.cn/"
          target="_blank"
          class="nav-link pl-3 pr-0"
          >联系我们</a
        >
      </div>
      <!--end::Nav-->
    </div>
    <!--end::Container-->
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
<style scoped>
  /* element.style {
    position: fixed;
    bottom: 0;
    width: 100%;
} */
</style>
