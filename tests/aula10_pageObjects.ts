import { ElementHandle, Page } from "@playwright/test"

export default class PageObject {
    protected page: Page | undefined
    //protected defaultDelay = 1000

    setPage(aPage: Page): void {
        this.page = aPage
    }

    async findElement(selector: string): Promise<ElementHandle | null> {
        return this.page ? await this.page.$(selector): null
    }

    async findElements(selector: string): Promise<ElementHandle[] | undefined> {
        return await this.page?.$$(selector)
    }

}