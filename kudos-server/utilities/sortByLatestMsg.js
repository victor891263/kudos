module.exports = function(arrayOfObjects) {
    arrayOfObjects.sort((a, b) => {
        if (new Date(a.lastMsg.createdAt).getTime() > new Date(b.lastMsg.createdAt).getTime()) {
            return -1
        }
        if (new Date(a.lastMsg.createdAt).getTime() < new Date(b.lastMsg.createdAt).getTime()) {
            return 1
        }
        return 0
    })
}