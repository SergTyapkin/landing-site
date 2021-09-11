const scrollBottomOffset = 1; // px

export default class PageScroller {
    constructor(element, pagesHandlers, scrollTopHandler = null, scrollBottomHandler = null) {
        this.element = element;
        this.handlers = pagesHandlers;

        let isMutexBlocked = false;
        this.scrollHandler = (event) => {
            if (isMutexBlocked) {
                return;
            }
            isMutexBlocked = true;
            this.handlers[Math.floor(this.element.scrollTop / this.element.clientHeight)](event, (this.element.scrollTop % this.element.clientHeight) / this.element.clientHeight);

            if (this.block.scrollTop <= scrollTopOffset && scrollTopHandler) {
                scrollTopHandler(event);
            }
            if (this.block.scrollTop + this.block.clientHeight >= this.block.scrollHeight - scrollBottomOffset && scrollBottomHandler) {
                scrollBottomHandler(event);
            }
            isMutexBlocked = false;
        };

        element.addEventListener('scroll', this.scrollHandler);
    }
}
