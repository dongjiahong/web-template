<template>
  <div class="list">
    <Button type="success">刷新</Button>
    <Button type="info">继续加载</Button>
    <Button type="warning" @click="toEdit">编辑</Button>
    <Divider/>
    <div style="margin-bottom: 20px;">
      <div style="padding: 1px; float: left;" v-for="m in medias" :key="m.id">
        <ShowCard :media="m" @selectCallback="selectCallback"></ShowCard>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard";
import api from "@/fetch/api";

export default {
  name: "ListVideo",
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
      selectMedias: []
    };
  },
  methods: {
    fetchVideo: function() {
      api.getVideos(this.page, this.pagesize).then(data => {
        this.medias.push(...data.data);
        if (this.medias.length > 0) {
          this.page = 1;
          this.pageSize = this.medias.length;
        }
      });
    },
    selectCallback(item, sel) {
      if (sel == false) { 
        for (let i=0; i< this.selectMedias.length;i++) {
          if (this.selectMedias[i].id === item.id) {
            this.selectMedias.splice(i,1) // 当选择框取消时候删除相应的元素
          }
        }
        return
      } else { // 如果已经有相同的素材就不在添加了
        for (let i=0; i< this.selectMedias.length;i++) {
          if (this.selectMedias[i].id === item.id) {
            return
          }
        }
      }
      this.selectMedias.push(item)
    },
    toEdit() {
      // 跳转到编辑页
      if (this.selectMedias.length === 0) {
        this.$Notice.warning({
          title: "警告",
          desc: "请选择需要编辑的素材"
        });
        return;
      }
      this.$router.push({
        name: "edit", // 匹配路由名
        params: {
          medias: this.selectMedias
        }
      });
      this.selectMedias = []; // 清空选项
    }
  }
};
</script>

