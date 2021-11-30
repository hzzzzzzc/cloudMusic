let debounce = function (fn, delay = 500) {
    let timer = null;
    
    return function () {
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn()
        }, delay)
    }
}


export default debounce