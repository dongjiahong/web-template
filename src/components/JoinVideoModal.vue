<template>
  <Modal v-model="showModel" title="合并视频" @on-ok="ok" @on-cancel="cancel">
    <p v-for="v in videoList" :key="v.id">{{v.url}}</p>
  </Modal>
</template>

<script>
import api from '@/fetch/api'

export default {
  name: "JoinVideoModal",
  props: {
    modelShow: Boolean,
    videoList: Array
  },
  data() {
    return {
      showModel: this.modelShow // 这个在对象创建时候调用，所以当modelshow变化时候需要再次给showmodel赋值
    };
  },
  methods: {
    ok() {
      if (this.videoList == undefined || this.videoList.length < 2) {
        this.$Message.info("合并视频需要两个视频以上，请重新选择");
        return
      }
      let names = new Array();
      for (let v of this.videoList) {
          names.push(v.name)
      }
      let params = names.join(',')
      api.getEditJoin(params).then(data=>{
        this.$Message.info(data.message);
      })
    },
    cancel() {
      // this.modelShow = false
    }
  },
  watch: {
    // 这里要监视modelshow，方便给showmodel传参，我也奇怪为何调用时候的`showModel: this.modelShow`没有用
    modelShow() {
      this.showModel = this.modelShow;
    },
    // 当showModel变化时候上报父组件
    showModel() {
      this.$emit("update:modelShow", this.showModel);
    }
  }
};
</script>

