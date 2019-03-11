<template>
  <div class="edit">
    <Button type="success" @click="joinVideo">合并视频</Button>
    <Button type="info">gif转视频</Button>
    <Button type="success">小视频加黑框</Button>
    <Button type="info">删除视频声音</Button>
    <Button type="success">添加视频声音</Button>
    <Divider orientation="left">原素材区</Divider>
    <div style="margin-bottom: 20px;">
      <div style="padding: 1px; float: left;" v-for="m of medias" :key="m.id">
        <ShowCard :media="m" @selectCallback="selectCallback"></ShowCard>
      </div>
    </div>
    <div class="result">
      <Divider orientation="left">生成素材区</Divider>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard";
import api from '@/fetch/api'

export default {
  name: "Edit",
  components: {
    ShowCard
  },
  data() {
    return {
      noContent: true,
      medias: this.$route.params.medias
    };
  },
  methods: {
    selectCallback(item, sel) {
      if (sel == false) {
        for (let i = 0; i < this.medias.length; i++) {
          if (this.medias[i].id === item.id) {
            this.medias.splice(i, 1); // 当选择框取消时候删除相应的元素
          }
        }
        return
      } else {
        // 如果已经有相同的素材就不在添加了
        for (let i = 0; i < this.medias.length; i++) {
          if (this.medias[i].id === item.id) {
            return;
          }
        }
      }
      this.medias.push(item);
    },
    joinVideo() {
        let names = []
        for(let m of this.medias) {
            names.push(m.file_name)
        }
        api.editJoinVideo(names.join(",")).then(data=>{
            this.$Message.info(data.message)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
