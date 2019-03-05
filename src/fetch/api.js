import async from './fetch'

export default {
    getVideos(page, pagesize) {
        return async ('/get/video/'+page+'/'+pagesize).then(data=>data)
    }, 
    getImgs(page, pagesize) {
        return async ('/get/img/'+page+'/'+pagesize).then(data=>data)
    }, 
    getTasksQueue(page, pagesize) { // 获取任务队列的状态
        return async ('/get/tq/'+page+'/'+pagesize).then(data=>data)
    },
    getEditJoin(params) { // 获取新添加队列的状态
        return async ('/edit/join?names='+params).then(data=>data)
    },
}