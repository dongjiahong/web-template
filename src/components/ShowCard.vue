<template>
  <div>
    <Drawer
      title="Media Detail"
      placement="right"
      :closable="false"
      v-model="showDrawer"
      width="400"
    >
      <Row>
        <i-col span="4">
          <strong>素材ID:</strong>
        </i-col>
        <i-col span="20">{{media.id}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>文件名:</strong>
        </i-col>
        <i-col span="20">{{media.file_name}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>标 题:</strong>
        </i-col>
        <i-col span="20">{{media.title}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>描 述:</strong>
        </i-col>
        <i-col span="20">{{media.description}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>使用次数:</strong>
        </i-col>
        <i-col span="20">{{media.use_num}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>图片|视频:</strong>
        </i-col>
        <i-col span="20">{{media.video_or_pic}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>素材类型:</strong>
        </i-col>
        <i-col span="20">{{media.media_type}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>素材标签:</strong>
        </i-col>
        <i-col span="20">{{media.media_tag}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>素材链接:</strong>
        </i-col>
        <i-col span="20"><a :href="media.url" target="view_window">{{media.url}}</a></i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>创建时间:</strong>
        </i-col>
        <i-col span="20">{{media.ts}}</i-col>
      </Row>
      <Divider></Divider>
      <Button type="error" @click="deleteMedia">删除素材</Button>
    </Drawer>
    <Card style="width:250px; height:250px">
      <Checkbox v-model="single" slot="title" @on-change="change">
        <span>{{media.title}}</span>
      </Checkbox>
      <div slot="extra">
        <Icon size="20" type="md-color-palette" @click="showDetail"></Icon>
      </div>
      <div v-if="media.video_or_pic === 'video'">
        <video width="200" height="150" controls="controls">
          <source :src="media.url" type="video/mp4">
        </video>
      </div>
      <div v-else>
        <img :src="media.url">
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "ShowCard",
  props: {
    media: Object // 需要父组件传递下来
  },
  data() {
    return {
      showDrawer: false,
      single: false // 控制是否被选
    };
  },
  methods: {
    change(sel) {
      this.$emit("selectCallback", this.media, sel); // 将消息上传给父组件，调用父组件的callback, 选中时sel是true，取消是false
    },
    showDetail() {
      this.showDrawer = true;
    },
    deleteMedia() {
      // TODO
    }
  }
};
</script>

<style >
img {
  height: 180px;
  width: 180px;
}
</style>

