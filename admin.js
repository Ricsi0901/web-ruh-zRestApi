$(function() {
    const myAjax = new MyAjax();
    const termeke=[];
    const vegpont="http://localhost:3000/termekek";
    myAjax.getAdat(vegpont,termeke, termekLista);
     const hossz=termeke.length;
    function termekLista(termekek) {
        const szuloElem = $("table");
        const sablonElem = $(".termek");

        termekek.forEach(function(elem) {
            let node = sablonElem.clone().appendTo(szuloElem);
            const obj = new TermekAdmin(node, elem);
               
        });
        sablonElem.remove(); //sablonelem eltávolítása
        $("#modositasa").hide();
    }
    $(window).on("torles", (eseny) => {
        console.log("Töröltem magam!")
        myAjax.deleteAdat(vegpont,eseny.detail.id);
    });
    $(window).on("modositas", (eseny) => {

        $("#szama").val(eseny.detail.id);
        $("#nev").val(eseny.detail.nev);
        $("#kepe").val(eseny.detail.kep);
        $("#leirasa").val(eseny.detail.leiras);
        $("#ara").val(eseny.detail.ar);
        $("#modositasa").show();
        $("#ujAdat").hide();


    });
    $("#modositasa").on("click", function() {
        
        let ujAdat = {
            id: $("#szama").val(),
            nev: $("#nev").val(),
            kep: $("#kepe").val(),
            leiras: $("#leirasa").val(),
            ar: $("#ara").val(),
        }
        console.log(ujAdat);
        myAjax.putAdat(vegpont,ujAdat,$("#szama").val());


    });
    $("#ujAdat").on("click", function() {
        
        let ujAdat = {
            id: hossz+1,
            nev: $("#nev").val(),
            kep: $("#kepe").val(),
            leiras: $("#leirasa").val(),
            ar: $("#ara").val(),
        }
        console.log(ujAdat);
        myAjax.putAdat(vegpont,ujAdat,hossz+1);


    });

});