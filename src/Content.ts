import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from './Megoldas';

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Szójáték</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        //Adatok beolvasása
        const megold: Megoldas = new Megoldas("szoveg.txt");
        //Linkek hozzáadása
        res.write("Linkek: ")
        res.write('<a href="https://github.com/somogyiabel/Szojatek13A_SA">GITHUB</a> ')
        res.write(' <a href="https://szojatek13a-sa.herokuapp.com/">HEROKU</a>\n')
        //1
        const bekertSzo: string = params.bekertSzo as string;
        res.write(`1. feladat Adjon meg egy szót: <input type='text' value='' name='bekertSzo' value=${bekertSzo} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        if (bekertSzo != "" && bekertSzo != null) {
            res.write(`1. feladat: ${megold.maganhangzoKereses(bekertSzo)}\n`);
        }
        //2
        res.write(`2. Feladat: Leghosszabb szó: ${megold.leghosszabbSzoKereses}\n`);
        //3
        res.write(`3. Feladat: ${megold.tobbMaganhangzo}%\n`);
        //4
        const bekertLetra: string = params.bekertLetra as string;
        res.write(`4. feladat Adjon meg egy szót: <input type='text' value='' name='bekertLetra' value=${bekertLetra} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        if (bekertLetra != "" && bekertLetra != null) {
            res.write(`4. feladat: A(z) "${bekertLetra}" szólétrája: ${megold.szoLetra(bekertLetra)}\n`);
        }
        //5
        res.write("5. Feladat: File Kiírása\n")
        res.write('"letra.txt" tartalma\n')
        res.write(megold.szoLetrakFajlba("letra.txt"));
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
