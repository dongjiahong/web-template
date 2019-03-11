<template>
  <div class="job-detail">
    <Row>
      <i-col span="6">
        <strong>任务ID:</strong>
        <span>{{row.task_id}}</span>
      </i-col>
      <i-col span="8">
        <strong>任务名:</strong>
        <span>{{row.worker_name}}</span>
      </i-col>
      <i-col span="10">
        <strong>任务参数:</strong>
        <span>{{row.worker_args}}</span>
      </i-col>
    </Row>
    <br>
    <Row>
      <i-col span="6">
        <strong>任务消息:</strong>
        <span>{{row.result_msg}}</span>
      </i-col>
      <i-col span="8">
        <strong>输出文件名:</strong>
        <span>{{row.result_name}}</span>
      </i-col>
      <i-col span="10">
        <strong>输出文件链接:</strong>
        <span>{{row.result_url}}</span>
      </i-col>
    </Row>
    <br>
    <Row>
      <i-col span="6">
        <strong>任务状态:</strong>
        <span>{{row.result_state}}</span>
      </i-col>
      <i-col span="8">
        <strong>任务开始时间:</strong>
        <span>{{row.worker_start}}</span>
      </i-col>
      <i-col span="10">
        <strong>任务结束时间:</strong>
        <span>{{row.worker_end}}</span>
      </i-col>
    </Row>
    <br>
    <Button type="info" @click="clickMediaDetail">查看生成文件</Button>
    <Button type="error">删除任务记录</Button>
    <MediaDetail :showMedia.sync="showMediaDetail" :mitem="mediaItem"></MediaDetail>
  </div>
</template>

<script>
import MediaDetail from "@/components/MediaDetail";

export default {
  name: "JobDetail",
  components: {
    MediaDetail
  },
  props: {
    row: Object
  },
  data() {
    return {
      showMediaDetail: false,
      mediaItem: {
        name: "", // 文件名
        // title: "", // 素材title
        // description: "", // 素材描述
        source: "", // 素材的来源 spider|upload|job
        // video_or_pic: "", // 素材是图片还是视频 video|picture
        // media_type: "", // 素材类型 mp4|gif
        // media_tag: "", // 素材的标签 搞笑|流行
        url: "" // 素材的链接
      },
    };
  },
  methods: {
    clickMediaDetail() {
      this.showMediaDetail = true;
      this.mediaItem.name = this.row.result_name;
      this.mediaItem.url = this.row.result_url;
      this.mediaItem.source = "job"
    }
  }
};
</script>

