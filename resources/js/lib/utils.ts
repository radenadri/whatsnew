import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { onMounted } from 'vue';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function initMonospaceScript() {
    onMounted(() => {
        adjustMediaPadding();
        window.addEventListener('load', adjustMediaPadding);
        window.addEventListener('resize', adjustMediaPadding);
    });
}

function adjustMediaPadding() {
    const cell = gridCellDimensions();

    function setHeightFromRatio(media, ratio) {
        const rect = media.getBoundingClientRect();
        const realHeight = rect.width / ratio;
        const diff = cell.height - (realHeight % cell.height);
        media.style.setProperty('padding-bottom', `${diff}px`);
    }

    function setFallbackHeight(media) {
        const rect = media.getBoundingClientRect();
        const height = Math.round(rect.width / 2 / cell.height) * cell.height;
        media.style.setProperty('height', `${height}px`);
    }

    function onMediaLoaded(media) {
        var width, height;
        switch (media.tagName) {
            case 'IMG':
                width = media.naturalWidth;
                height = media.naturalHeight;
                break;
            case 'VIDEO':
                width = media.videoWidth;
                height = media.videoHeight;
                break;
        }
        if (width > 0 && height > 0) {
            setHeightFromRatio(media, width / height);
        } else {
            setFallbackHeight(media);
        }
    }

    const medias = document.querySelectorAll('img, video');
    for (media of medias) {
        switch (media.tagName) {
            case 'IMG':
                if (media.complete) {
                    onMediaLoaded(media);
                } else {
                    media.addEventListener('load', () => onMediaLoaded(media));
                    media.addEventListener('error', function () {
                        setFallbackHeight(media);
                    });
                }
                break;
            case 'VIDEO':
                switch (media.readyState) {
                    case HTMLMediaElement.HAVE_CURRENT_DATA:
                    case HTMLMediaElement.HAVE_FUTURE_DATA:
                    case HTMLMediaElement.HAVE_ENOUGH_DATA:
                        onMediaLoaded(media);
                        break;
                    default:
                        media.addEventListener('loadeddata', () => onMediaLoaded(media));
                        media.addEventListener('error', function () {
                            setFallbackHeight(media);
                        });
                        break;
                }
                break;
        }
    }
}

function gridCellDimensions() {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.height = 'var(--line-height)';
    element.style.width = '1ch';
    document.body.appendChild(element);
    const rect = element.getBoundingClientRect();
    document.body.removeChild(element);
    return { width: rect.width, height: rect.height };
}
