export default class PageScroller {
    lastPageIdx = 0;

    constructor(element = document.documentElement, onscrollElement = window) {
        this.element = element;
        this.onscrollElement = onscrollElement;
    }

    setHandlers(pagesHandlers = []) {
        this.handlers = pagesHandlers;
        this.pages = pagesHandlers.length;

        let isMutexBlocked = false;
        this.scrollHandler = () => {
            if (isMutexBlocked) {
                return;
            }
            isMutexBlocked = true; // start mutex
            const pageIdx = Math.floor(this.element.scrollTop / this.element.clientHeight);
            if (pageIdx < this.lastPageIdx) { // scroll to top
                this.handlers[pageIdx].onstart();
                for (let i = pageIdx + 1; i < this.lastPageIdx; i++) { // if you scroll over many pages
                    this.handlers[i].onstart();
                    this.handlers[i].onprogress(0);
                    this.handlers[i].onendTop();
                }
                this.handlers[this.lastPageIdx].onprogress(0);
                this.handlers[this.lastPageIdx].onendTop();
            } else if (pageIdx > this.lastPageIdx) { // scroll to bottom
                this.handlers[pageIdx].onstart();
                for (let i = this.lastPageIdx + 1; i < pageIdx; i++) { // if you scroll over many pages
                    this.handlers[i].onstart();
                    this.handlers[i].onprogress(1);
                    this.handlers[i].onendBottom();
                }
                this.handlers[this.lastPageIdx].onprogress(1);
                this.handlers[this.lastPageIdx].onendBottom();
            }

            const progress = (this.element.scrollTop % this.element.clientHeight) / this.element.clientHeight;
            if (pageIdx < this.pages) {
                this.handlers[pageIdx].onprogress(progress);
            }
            this.lastPageIdx = pageIdx;
            isMutexBlocked = false; // end mutex
        };

        this.onscrollElement.addEventListener('scroll', this.scrollHandler);
    }
}
