<template>
  <div class="index">
    <Layout>
      <Header>
        <h1 @click="editMedia">edit</h1>
      </Header>
    </Layout>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu active-name="1-1" them="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>视频
            </template>
            <MenuItem name="1-1">流行</MenuItem>
            <MenuItem name="1-2">搞笑</MenuItem>
            <MenuItem name="1-3">上传</MenuItem>
            <MenuItem name="1-4">其他</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>图片
            </template>
            <MenuItem name="2-1">gif</MenuItem>
            <MenuItem name="2-2">jpg</MenuItem>
            <MenuItem name="2-3">上传</MenuItem>
            <MenuItem name="2-3">其他</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Content :style="{padding: '24px', minHeight: '380px', background: '#fff'}">
        <div style="margin-bottom: 20px;">
          <div style="padding: 1px; float: left;" v-for="v in videos" :key="v.id">
            <ShowCard :media="v" @selectCallback="selectCallback"></ShowCard>
          </div>
        </div>
        <div style="position: absolute; bottom: 10px; left: 50%;">
          <Button type="primary">加载更多</Button>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard";
import api from "@/fetch/api";

export default {
  name: "Index",
  components: {
    ShowCard
  },
  data() {
    return {
      // video: {
      //   id: 1,
      //   name: "01.mp4",
      //   title: "励志小视频",
      //   description: "小孩视频真励志",
      //   video_or_pic: "video",
      //   media_type: "mp4",
      //   media_tag: "搞笑,励志",
      //   url: "http://localhost:8080/media/video/01.mp4",
      //   ts: "2019-03-04 19:40:33"
      // }
      videos: [],
      selectedMedia: [],
      page: 0,
      pageSize: 20,
      number: [1, 2, 3, 4, 5, 6, 7, 12, 8, 9, 0, 10, 11, 14, 15, 16, 17]
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    selectCallback(info) {
      this.selectedMedia.push(info);
    },
    editMedia() {
      // 跳转到编辑页
      if (this.selectedMedia.length === 0) {
        this.$Notice.warning({
          title: "警告",
          desc: "请选择需要编辑的素材"
        });
        return;
      }
      this.$router.push({
        name: "edit", // 匹配路由名
        params: {
          selectedMedia: this.selectedMedia
        }
      });
      this.selectedMedia = []; // 清空选项
    },
    fetchData: function() {
      api.getVideos(this.page, this.pageSize).then(data => {
        this.videos.push(...data.data);
        if (this.videos.length > 0) {
          this.page = 1;
          this.pageSize = this.videos.length;
        }
      });
    }
  }
};
</script>

<style scoped>
.index {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
}
</style>
