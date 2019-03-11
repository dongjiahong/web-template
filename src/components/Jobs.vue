<template>
  <div class="jobs">
    <Button type="success" @click="fetchJobs">刷新</Button>
    <Button type="info">继续加载</Button>
    <Divider/>
    <Table border ref="selection" :columns="columns" :data="jobData"></Table>
  </div>
</template>

<script>
import JobDetail from "@/components/JobDetail";
import api from "@/fetch/api";

export default {
  name: "Jobs",
  components: {
    JobDetail
  },
  created: function() {
    this.fetchJobs();
  },
  data() {
    return {
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(JobDetail, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "任务ID",
          key: "task_id",
          tooltip: true, // 超出隐藏
          //   maxWidth: 100,
          align: "left"
        },
        {
          title: "任务名",
          key: "worker_name",
          tooltip: true, // 超出隐藏
          maxWidth: 100,
          align: "center"
        },
        {
          title: "任务消息",
          key: "result_msg",
          tooltip: true, // 超出隐藏
          align: "left"
        },
        {
          title: "输出文件名",
          key: "result_name",
          tooltip: true, // 超出隐藏
          //   maxWidth: 100,
          align: "left"
        },
        {
          title: "输出文件链接",
          key: "result_url",
          tooltip: true, // 超出隐藏
          align: "left"
        },
        {
          title: "任务状态",
          key: "result_state",
          tooltip: true, // 超出隐藏
          maxWidth: 90,
          align: "center"
        }
      ],
      jobData: [],
      page: 0,
      pagesize: 10
    };
  },
  methods: {
    fetchJobs: function() {
      api.getTasksQueue(this.page, this.pagesize).then(data => {
        if (data.data.length > 0) {
          this.jobData.unshift(...data.data);
          this.page += 1;
          return;
        }
        this.$Message.info("暂时没有新任务，过会再尝试");
      });
    }
  }
};
</script>

