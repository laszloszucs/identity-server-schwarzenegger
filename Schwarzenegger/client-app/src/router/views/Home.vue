<template>
  <div class="home">
    <DxButton
      class="button"
      @click="callApi"
      type="success"
      height="35"
      width="95"
      >Call API</DxButton
    >
    <DxDataGrid
      :allow-column-reordering="true"
      :data-source="values"
      :show-borders="true"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="true" />
      <DxPaging />
      <DxSearchPanel :visible="true" />
    </DxDataGrid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import {
  DxDataGrid,
  DxGrouping,
  DxGroupPanel,
  DxSearchPanel,
  DxPaging
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";

@Component({
  components: {
    DxDataGrid,
    DxGrouping,
    DxGroupPanel,
    DxSearchPanel,
    DxPaging,
    DxButton
  }
})
export default class Home extends Vue {
  values: string[] = [];

  async callApi() {
    try {
      const response = await axios.get(
        `https://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}/api/test`
      );
      this.values = response.data;
    } catch (err) {
      this.values = [err];
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin-bottom: 15px;
}
</style>
