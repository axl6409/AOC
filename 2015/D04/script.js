function resolveRiddle() {
    const instructions = document.querySelector('pre').textContent.trim();

    if (!instructions) {
        alert("Aucune instruction trouvée!");
        return;
    }

    let result = 0;

    for (let i = 0; i < Infinity; i++) {
        let key = instructions + "601454";
        let md5 = CryptoJS.MD5(key);
        console.log(md5)

        // if (md5.startsWith("00000")) {
        //     result = md5;
        //     break;
        // }
    }

    alert(`MD5 key : ${result}`);
}