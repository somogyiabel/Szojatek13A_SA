import Megoldas from "../Megoldas";

describe("Megoldas osztály unit tesztek.", () =>{
    const instance: Megoldas = new Megoldas("szoveg.txt");
    it("Megoldas osztály tesztelése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });
    it("2. feladat: leghosszabb szó keresés", async () => {
        expect(instance.leghosszabbSzoKereses).toBe("angyalszobrokat (15 karakter)");
    });
    it("3. feladat: több magánhangzós szavak keresése", async () => {
        expect(instance.tobbMaganhangzo).toBe("79/7826 : 1.02");
    });
});