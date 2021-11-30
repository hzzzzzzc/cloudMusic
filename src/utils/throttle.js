let throttle = function (fn, delay) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn()
                timer = null
            }, delay)
        }
    }
}


export default throttle