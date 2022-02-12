export default class PageScroller {
    lastPageIdx = 0;

    constructor(element = document.documentElement, onscrollElement = window) {
        this.element = element;
        this.onscrollElement = onscrollElement;
    }

    setHandlers(pagesHandlers = []) {
        this.handlers = pagesHandlers;
        this.pages = pagesHandlers.length;

        let clientHeight = 1;
        this.handlers.forEach((handler) => { clientHeight += handler.duration; });
        this.element.style.height = clientHeight * 100 + 'vh';

        let isMutexBlocked = false;
        this.scrollHandler = () => {
            if (isMutexBlocked) {
                return;
            }
            isMutexBlocked = true; // start mutex

            const curScroll = this.element.scrollTop / this.element.clientHeight;
            let prevPagesDuration = 0;
            let curPageDuration;
            let pageIdx;
            for (let i = 0; i < this.pages; i++) { // get current page idx
                curPageDuration = this.handlers[i].duration;
                if (prevPagesDuration + curPageDuration > curScroll) {
                    pageIdx = i;
                    break;
                }
                prevPagesDuration += curPageDuration;
            }
            if (pageIdx >= this.pages) {
                isMutexBlocked = false;
                return;
            }

            if (pageIdx < this.lastPageIdx) { // scroll to top
                for (let i = pageIdx + 1; i < this.lastPageIdx; i++) { // if you scroll over many pages
                    this.handlers[i].onprogress(0);
                    this.handlers[i].onendTop();
                    this.handlers[i].onstart();
                }
                this.handlers[this.lastPageIdx].onprogress(0);
                this.handlers[this.lastPageIdx].onendTop();
                this.handlers[pageIdx].onstart();
            } else if (pageIdx > this.lastPageIdx) { // scroll to bottom
                for (let i = this.lastPageIdx + 1; i < pageIdx; i++) { // if you scroll over many pages
                    this.handlers[i].onprogress(1);
                    this.handlers[i].onendBottom();
                    this.handlers[i].onstart();
                }
                this.handlers[this.lastPageIdx].onprogress(1);
                this.handlers[this.lastPageIdx].onendBottom();
                this.handlers[pageIdx].onstart();
            }

            const progress = (this.element.scrollTop - this.element.clientHeight * prevPagesDuration) / (this.element.clientHeight * curPageDuration);
            if (pageIdx < this.pages) {
                this.handlers[pageIdx].onprogress(progress);
            }
            this.lastPageIdx = pageIdx;

            isMutexBlocked = false; // end mutex
        };

        this.onscrollElement.addEventListener('scroll', this.scrollHandler);
    }

    clear() {
        this.element.style.height = '';
    }
}
