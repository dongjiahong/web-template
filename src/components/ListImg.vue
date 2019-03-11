<template>
  <div class="list">
      <Button type="success">刷新</Button>
      <Button type="info">继续加载</Button>
      <Button type="warning">编辑</Button>
      <Divider/>
    <div style="margin-bottom: 20px;">
      <div style="padding: 1px; float: left;" v-for="m in medias" :key="m.id">
        <ShowCard :media="m"></ShowCard>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard";
import api from "@/fetch/api";

export default {
  name: "ListImg",
  components: {
    ShowCard
  },
  created: function() {
    this.fetchVideo();
  },
  data() {
    return {
      page: 0,
      pagesize: 30,
      medias: [],
    };
  },
  methods: {
    fetchVideo: function() {
      api.getImgs(this.page, this.pagesize).then(data => {
        this.medias.push(...data.data);
        if (this.medias.length > 0) {
          this.page = 1;
          this.pageSize = this.medias.length;
        }
      });
    }
  }
};
</script>

