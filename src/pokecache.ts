export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}


export class Cache {
    constructor(interval: number) {
        this.#interval = interval;
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    
    #reapIntervalId: NodeJS.Timeout | undefined;
    #interval: number;
    #cache = new Map<string, CacheEntry<unknown>>();

    #reap() {
        for (const [key, entry] of this.#cache.entries()) {
            if (Date.now() - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    stopReapLoop() {
        if(this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {createdAt: Date.now(), val});
    }
    
    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        return entry ? entry.val as T: undefined;
    }
}
