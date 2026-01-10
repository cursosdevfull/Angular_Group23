import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenService {
    save(name: string, value: string) {
        sessionStorage.setItem(name, value);
    }

    retrieve(name: string): string | null {
        return sessionStorage.getItem(name);
    }

    remove(name: string) {
        sessionStorage.removeItem(name);
    }

    clear() {
        sessionStorage.clear();
    }
}