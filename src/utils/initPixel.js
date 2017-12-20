/**
 * Created by Administrator on 2017/11/14.
 */

(function (win,doc) {
  var docEl = doc.documentElement;
  var resizeEvent = 'orientationchange' in window ? 'orientationchange':'resize';
  recalc = function () {
    var clientWidth = docEl.clientWidth;
    if(!clientWidth) return;
    docEl.style.fontSize = 20*(clientWidth/320) + 'px';
  }
  win.addEventListener(resizeEvent,recalc,false);
  doc.addEventListener('DOMContentLoaded',recalc,false)

})(window,document)
