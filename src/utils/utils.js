/**
 * 存储localStorage
 * @param {*} name 键
 * @param {*} content 值 
 */
export const setLocalStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/** 
 * 获取localStorage
 * @param {*} name 键
*/
export const getLocalStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/** 
 * 删除localStorage
 * @param {*} name 键
*/
export const removeLocalStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}