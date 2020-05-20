module.exports = function gerResponse(body, code, success, message) {
    return {
        body: body || null, // 无返回内容则返回 null
        code: code || 200, // 状态编码
        success: success || true, // 状态
        message: message || '', // 错误消息
    }
}