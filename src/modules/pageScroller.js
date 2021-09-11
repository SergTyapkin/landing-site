const scrollBottomOffset = 1; // px
const scrollTopOffset = 1; // px

export default class PageScroller {
    constructor(element = document.documentElement, onscrollElement = window) {
        this.element = element;
        this.onscrollElement = onscrollElement;
    }

    setHandlers(pagesHandlers = [], pageToPageHandlers = [], scrollTopHandler = null, scrollBottomHandler = null) {
        this.handlers = pagesHandlers;
        this.pages = pagesHandlers.length;

        let isMutexBlocked = false;
        this.scrollHandler = () => {
            if (isMutexBlocked) {
                return;
            }
            isMutexBlocked = true; // start mutex
            const handlerId = Math.floor(this.element.scrollTop / this.element.clientHeight);
            const progress = (this.element.scrollTop % this.element.clientHeight) / this.element.clientHeight;
            if (handlerId < this.pages) {
                this.handlers[handlerId](progress);
            }

            if (this.element.scrollTop <= scrollTopOffset && scrollTopHandler) {
                scrollTopHandler();
            }
            if (this.element.scrollTop + this.element.clientHeight >= this.element.scrollHeight - scrollBottomOffset && scrollBottomHandler) {
                scrollBottomHandler();
            }
            isMutexBlocked = false; // end mutex
        };

        this.onscrollElement.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
    }
}
