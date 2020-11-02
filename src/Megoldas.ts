import fs from "fs";
import { addListener } from 'process';

export default class Megoldas {
    private _szavak: string[] = [];
    constructor(forras: string){
        fs.readFileSync(forras).toString().split("\n").forEach(i => {
            this._szavak.push(i.trim());
        });
    }

    public maganhangzoKereses(bekertSzo: string): string{
        if (bekertSzo.includes('a') || bekertSzo.includes('e') || bekertSzo.includes('i') || bekertSzo.includes('o') || bekertSzo.includes('u')) {
            return "Van benne magánhangzó.";
        }
        else {
            return "Nincs benne magánhangzó.";
        }
    }

    public get leghosszabbSzoKereses(): string {
        let leghosszabbszo = "";
        this._szavak.forEach(i => {
            if (i.length > leghosszabbszo.length) {
                leghosszabbszo = i;
            }
        });
        return `${leghosszabbszo} (${leghosszabbszo.length} karakter)`;
    }

    public get tobbMaganhangzo(): string{
        let tobbMagan = 0;
        let kevesebbMagan = 0;
        this._szavak.forEach(i => {
            let maganhangzokSzama = 0;
            let egyebKarakterekSzama = 0;
            for (const betu of i) {
                if (betu == 'a' || betu == 'e' || betu == 'i' || betu == 'o' || betu == 'u') {
                    maganhangzokSzama++;
                }
                else{
                    egyebKarakterekSzama++;
                }
            }
            if (maganhangzokSzama > egyebKarakterekSzama) {
                tobbMagan++;
            }
            else{
                kevesebbMagan++;
            }
        });
        return `${tobbMagan}/${this._szavak.length} : ${((tobbMagan/kevesebbMagan)*100).toFixed(2)}`;
    }
    private _otBetusSzavak: string[] = [];
    public szoLetra(bekertLetra: string): string{
        let letra: string[] = [];
        
        this._szavak.forEach(i => {
            if (i.length == 5) {
                this._otBetusSzavak.push(i);
            }
        });
        this._otBetusSzavak.forEach(szo => {
            if(szo[1] == bekertLetra[0] && szo[2] == bekertLetra[1] && szo[3] == bekertLetra[2]){
                letra.push(szo);
            }
        });
        return letra.join(" ");
    }

    public szoLetrakFajlba(fileName: string): string{
        fs.writeFileSync(fileName, "");
        let letraMap = new Map();
        let kiirtString: string = "";
        this._otBetusSzavak.forEach(i => {
            let szoKozepe = i[1] + i[2] + i[3];
            if (letraMap.has(szoKozepe)) {
                let ertek: string[] = [];
                ertek = letraMap.get(szoKozepe);
                ertek.push(i);
                letraMap.set(szoKozepe, ertek);
            }
            else{
                letraMap.set(szoKozepe, [i]);
            }
        });
        for (const [key, value] of letraMap) {
            if (value.length == 1) {
                letraMap.delete(key)
            }
        }
        for (const [key, value] of letraMap) {
            fs.appendFileSync(fileName, value.join("\r\n"));
            kiirtString += value.join("\r\n");
            fs.appendFileSync(fileName, "\r\n\r\n");
            kiirtString += "\r\n\r\n";
        }
        return kiirtString;
    }
}