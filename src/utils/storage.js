/**
 * Created by Administrator on 2017/11/16.
 */

function  getLocalStorage(name) {
  return window.localStorage.getItem(name);
}

function  setLocalStorage(name,dat) {
  window.localStorage.setItem(name,dat);
}

export  {
  getLocalStorage,
  setLocalStorage
}
