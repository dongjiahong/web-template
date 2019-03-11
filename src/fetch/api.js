import async from './fetch'

export default {
    getVideos(page, pagesize) {
        return async('/get/video/' + page + '/' + pagesize).then(data => data)
    },
    getImgs(page, pagesize) {
        return async('/get/img/' + page + '/' + pagesize).then(data => data)
    },
    getTasksQueue(page, pagesize) { // 获取任务队列的状态
        return async('/get/tq/' + page + '/' + pagesize).then(data => data)
    },
    editJoinVideo(filenames) { // 合并视频
        return async('/edit/join?file_names=' + filenames).then(data => data)
    },
    uploadMedia(media) { //
        return async('/upload', media, 'post')
    },
}