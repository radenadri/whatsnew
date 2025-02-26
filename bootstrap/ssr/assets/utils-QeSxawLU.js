import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { onMounted } from "vue";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function initMonospaceScript() {
  onMounted(() => {
    adjustMediaPadding();
    window.addEventListener("load", adjustMediaPadding);
    window.addEventListener("resize", adjustMediaPadding);
  });
}
function adjustMediaPadding() {
  const cell = gridCellDimensions();
  function setHeightFromRatio(media2, ratio) {
    const rect = media2.getBoundingClientRect();
    const realHeight = rect.width / ratio;
    const diff = cell.height - realHeight % cell.height;
    media2.style.setProperty("padding-bottom", `${diff}px`);
  }
  function setFallbackHeight(media2) {
    const rect = media2.getBoundingClientRect();
    const height = Math.round(rect.width / 2 / cell.height) * cell.height;
    media2.style.setProperty("height", `${height}px`);
  }
  function onMediaLoaded(media2) {
    var width, height;
    switch (media2.tagName) {
      case "IMG":
        width = media2.naturalWidth;
        height = media2.naturalHeight;
        break;
      case "VIDEO":
        width = media2.videoWidth;
        height = media2.videoHeight;
        break;
    }
    if (width > 0 && height > 0) {
      setHeightFromRatio(media2, width / height);
    } else {
      setFallbackHeight(media2);
    }
  }
  const medias = document.querySelectorAll("img, video");
  for (media of medias) {
    switch (media.tagName) {
      case "IMG":
        if (media.complete) {
          onMediaLoaded(media);
        } else {
          media.addEventListener("load", () => onMediaLoaded(media));
          media.addEventListener("error", function() {
            setFallbackHeight(media);
          });
        }
        break;
      case "VIDEO":
        switch (media.readyState) {
          case HTMLMediaElement.HAVE_CURRENT_DATA:
          case HTMLMediaElement.HAVE_FUTURE_DATA:
          case HTMLMediaElement.HAVE_ENOUGH_DATA:
            onMediaLoaded(media);
            break;
          default:
            media.addEventListener("loadeddata", () => onMediaLoaded(media));
            media.addEventListener("error", function() {
              setFallbackHeight(media);
            });
            break;
        }
        break;
    }
  }
}
function gridCellDimensions() {
  const element = document.createElement("div");
  element.style.position = "fixed";
  element.style.height = "var(--line-height)";
  element.style.width = "1ch";
  document.body.appendChild(element);
  const rect = element.getBoundingClientRect();
  document.body.removeChild(element);
  return { width: rect.width, height: rect.height };
}
export {
  cn as c,
  initMonospaceScript as i
};
