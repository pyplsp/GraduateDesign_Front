import { Message } from 'element-ui'

// 用一个变量来存储最近一次的消息提示
let lastMessage = null

// 显示一条消息提示，并关闭之前的消息提示
export function showMessage(message, type = 'info') {
    if (lastMessage) {
        Message.closeAll()
    }
    lastMessage = Message({
        message,
        type,
    })
}
