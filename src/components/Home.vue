<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">
              <Button type="warning" @click="uploadMedia">素材上传</Button>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>Item 1
            </MenuItem>
            <MenuItem name="2">
            </MenuItem>
            <MediaDetail :showMedia.sync="showMediaDetail" :mitem="mediaItem"></MediaDetail>
          </div>
        </Menu>
      </Header>

      <Layout>
        <Sider hide-trigger :style="{background: '#fff', height: '100%'}">
          <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>基本功能
              </template>
              <MenuItem name="1-1" to="listvideo">浏览视频</MenuItem>
              <MenuItem name="1-2" to="listimg">浏览图片</MenuItem>
              <MenuItem name="1-3" to="edit">编辑</MenuItem>
              <MenuItem name="1-4" to="jobs">任务</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>Item 1
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '8px 4px 0 2px'}">
          <Content :style="{padding: '24px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Jobs from "@/components/Jobs";
import MediaDetail from "@/components/MediaDetail";

export default {
  name: "Home",
  components: {
    Jobs,
    MediaDetail
  },
  data() {
    return {
      showMediaDetail: false,
      mediaItem: {}
    };
  },
  methods: {
    uploadMedia() {
      this.showMediaDetail = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  border: 1px solid #d7dde4;
  height: 100%;
  .ivu-layout {
    height: 100%; // 让layout的高都100%等于父节点
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
  }
  .layout-nav {
    width: 220px;
    margin: 0 auto;
    margin-right: 20px;
  }
}
</style>

