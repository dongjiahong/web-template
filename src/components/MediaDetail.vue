<template>
  <div class="media-detail">
    <Modal v-model="show" title="素材详细信息" :loading="showLoading" @on-ok="asyncUpload">
      <Form ref="formItem" :model="formItem" :label-width="80">
        <!-- 这里prop的参数要和下面表单里要校验的名字一样，表单是formItem.name 这里的prop就是name -->
        <FormItem
          label="文件名"
          prop="file_name"
          :rules="{required: true, message: '请填写文件名内容', trigger: 'blur'}"
        >
          <i-input teyp="text" v-model="formItem.file_name" placeholder="Enter file name..."></i-input>
        </FormItem>
        <FormItem
          label="素材标题"
          prop="title"
          :rules="{required: true, message: '请填写标题内容', trigger: 'blur'}"
        >
          <i-input v-model="formItem.title" placeholder="Enter media title..."></i-input>
        </FormItem>
        <FormItem
          label="素材描述"
          prop="description"
          :rules="{required: true, message: '请填写描述内容', trigger: 'blur'}"
        >
          <i-input v-model="formItem.description" placeholder="Enter media desc..."></i-input>
        </FormItem>
        <FormItem label="素材来源">
          <Select v-model="formItem.source">
            <Option value="job">任务合成</Option>
            <Option value="upload">自己上传</Option>
          </Select>
        </FormItem>
        <FormItem label="素材类型">
          <Select v-model="formItem.video_or_pic">
            <Option value="video">视频</Option>
            <Option value="picture">图片</Option>
          </Select>
        </FormItem>
        <FormItem label="素材格式">
          <Select v-model="formItem.media_type">
            <Option value="mp4">mp4</Option>
            <Option value="gif">gif</Option>
          </Select>
        </FormItem>
        <FormItem
          label="素材标签"
          prop="media_tag"
          :rules="{required: true, message: '请填写标签内容', trigger: 'blur'}"
        >
          <i-input v-model="formItem.media_tag" placeholder="Enter media tag..."></i-input>
        </FormItem>
        <FormItem
          label="素材链接"
          prop="url"
          :rules="{required: true, message: '请填写素材链接内容', trigger: 'blur'}"
        >
          <i-input v-model="formItem.url" placeholder="Enter media url"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import api from "@/fetch/api";

export default {
  name: "MediaDetail",
  props: {
    showMedia: Boolean,
    mitem: Object
  },
  data() {
    return {
      show: false,
      required: true,
      tset: "",
      showLoading: true
    };
  },
  methods: {
    asyncUpload() {
      for (let key in this.formItem) {
        if (this.formItem[key] === "") {
          this.$Message.warning(key + " 需要填写内容!");
          this.showLoading = false;
          return;
        }
      }
      api.uploadMedia(this.formItem).then(data => {
        this.$Message.info({content: data.message, duration: 5});
      });
      this.show = false; // 关闭对话框
    }
  },
  computed: {
    formItem: function() {
      return {
        file_name: this.mitem ? this.mitem.name : "", // 文件名
        title: this.mitem ? this.mitem.title : "", // 素材title
        description: this.mitem ? this.mitem.description : "", // 素材描述
        source: this.mitem ? this.mitem.source : "", // 素材的来源 spider|upload|job
        video_or_pic: this.mitem ? this.mitem.video_or_pic : "", // 素材是图片还是视频 video|picture
        media_type: this.mitem ? this.mitem.media_type : "", // 素材类型 mp4|gif
        media_tag: this.mitem ? this.mitem.media_tag : "", // 素材的标签 搞笑|流行
        url: this.mitem ? this.mitem.url : "" // 素材的链接
      };
    }
  },
  watch: {
    showMedia: function() {
      this.show = this.showMedia;
    },
    show: function() {
      this.$emit("update:showMedia", this.show);
    }
  }
};
</script>

