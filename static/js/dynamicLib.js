/**
 * 动态引入插件js防止首页过慢
 */
function asynLoading({ url, resolve, reject, target, async }) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.async = async;
  script.src = url;
  script.onerror = reject;
  document.head.appendChild(script);
  script.onload = script.onreadystatechange = function() {
    if (
      !this.readyState ||
      this.readyState === "loaded" ||
      this.readyState === "complete"
    ) {
      resolve(window[target]);
    }
  };
}
// 引入高德地图
export function amapPullIn() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      asynLoading({
        resolve,
        reject,
        url: "/static/libs/amap.js",
        target: "AMap",
        async: true
      });
    }
  });
}
