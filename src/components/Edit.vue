<template>
  <div class="edit">
    <Drawer title="Job Detail" placement="right" :closable="false" v-model="showDrawer" width="400">
      <Row>
        <i-col span="4">
          <strong>任务ID:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.task_id}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>任务名:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.worker_name}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>状 态:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.result_state}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>文件名:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.result_name}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>文件链接:</strong>
        </i-col>
        <i-col span="20">
          <a :href="drawerInfo.result_url" target="view_window">{{drawerInfo.result_url}}</a>
        </i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>任务信息:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.result_msg}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>任务参数:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.worker_args}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>开 始:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.worker_start}}</i-col>
      </Row>
      <Row>
        <i-col span="4">
          <strong>结 束:</strong>
        </i-col>
        <i-col span="20">{{drawerInfo.worker_end}}</i-col>
      </Row>
    </Drawer>
    <Layout>
      <Sider collapsible v-model="isCollapsed" width="600" :style="{border: '1px solid #aaa'}">
        <div style="top: 10px; left: 50%;">
          <Button type="primary" @click="updateTasks" long>刷新</Button>
        </div>
        <Table
          v-show="!isCollapsed"
          :row-class-name="rowClassName"
          :columns="columns"
          :data="jobData"
          width="600"
        ></Table>
      </Sider>
      <Layout>
        <Header :style="{background: '#eee', border: '1px solid #aaa'}">
          <Button type="success" @click="clickShowJoinVideoModal">合并视频</Button>
          <JoinVideoModal :modelShow.sync="showJoinVideoModal" :videoList="selectedMedia"></JoinVideoModal>
          <Button type="info">视频添加黑框</Button>
          <Button type="success">gif转视频</Button>
          <Button type="info">删除视频声音</Button>
          <Button type="success">添加视频声音</Button>
          <Button type="info">合并视频</Button>
        </Header>
        <Content>
          <div style="margin-bottom: 20px;">
            <div style="padding: 1px; float: left;" v-for="v in selectedMedia" :key="v.id">
              <ShowCard :media="v"></ShowCard>
            </div>
          </div>
        </Content>
        <!-- <Footer :style="{background: '#bbb', height: '200px'}">预览</Footer> -->
      </Layout>
    </Layout>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard";
import api from "@/fetch/api";
import JoinVideoModal from "@/components/JoinVideoModal";

export default {
  name: "Edit",
  components: {
    ShowCard,
    JoinVideoModal
  },
  data() {
    return {
      selectedMedia: this.$route.params.selectedMedia,
      columns: [
        {
          title: "TaskId",
          key: "task_id",
          tooltip: true, // 超出隐藏
          maxWidth: 100,
          align: "left"
        },
        {
          title: "Name",
          key: "worker_name",
          tooltip: true,
          maxWidth: 100,
          align: "left"
        },
        {
          title: "State",
          key: "result_state",
          tooltip: true,
          maxWidth: 100,
          align: "left"
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "Detail"
              ),
              h(
                "Button",
                {
                  props: { type: "error", size: "small" },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      isCollapsed: true,
      jobData: [],
      showDrawer: false,
      showJoinVideoModal: false,
      page: 0,
      pagesize: 3,
      drawerInfo: {
        task_id: "",
        worker_name: "",
        worker_args: "",
        result_msg: "",
        result_state: "",
        result_name: "",
        result_url: "",
        worker_start: "",
        worker_end: ""
      }
    };
  },
  methods: {
    rowClassName(row, index) {
      if (row.result_state == 1) {
        return "succeed-row";
      } else if (row.result_state == 2) {
        return "failure-row";
      }
      return "";
    },
    show(index) {
      this.showDrawer = true;
      this.drawerInfo.task_id = this.jobData[index].task_id;
      this.drawerInfo.worker_name = this.jobData[index].worker_name;
      this.drawerInfo.worker_args = this.jobData[index].worker_args;
      this.drawerInfo.result_name = this.jobData[index].result_name;
      this.drawerInfo.result_state = this.jobData[index].result_state;
      this.drawerInfo.result_url = this.jobData[index].result_url;
      this.drawerInfo.result_msg = this.jobData[index].result_msg;
      this.drawerInfo.worker_start = this.jobData[index].worker_start;
      this.drawerInfo.worker_end = this.jobData[index].worker_end;
    },
    delete(index) {
      // TODO
    },
    clickShowJoinVideoModal() {
      this.showJoinVideoModal = true;
    },
    updateTasks() {
      api.getTasksQueue(this.page, this.pagesize).then(data => {
          console.log('==> page: ', this.page, " size: ", this.pagesize)
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


<style>
.ivu-table .succeed-row td {
  background-color: #66ccff;
  color: #fff;
}
.ivu-table .failure-row td {
  background-color: #ff6666;
  color: #fff;
}
</style>