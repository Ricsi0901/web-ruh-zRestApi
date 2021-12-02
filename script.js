$(function () {
  const myAjax = new MyAjax();
  const kosar = new Kosar()
  const termek=[];
  let apivegpont = "http://localhost:3000/termekek";
  
  let rendezes = "?_sort=ar&_order=desc";
  myAjax.getAdat(apivegpont,termek, termekLista)

  $("#keresSzoveg").on("keyup", () => {

    let apivegpont = "http://localhost:3000/termekek";
    apivegpont += "?q=" + $("#keresSzoveg").val();
    console.log(apivegpont);

    myAjax.getAdat(apivegpont,termek,termekLista);
  });

  $("#rendezes").on("change", () => {
    switch ($("#rendezes").val()) {
      case "NameListAsc":
          rendezes = "?_sort=nev&_order=asc";
          apivegpont = "http://localhost:3000/termekek";
          apivegpont += rendezes;
          myAjax.getAdat(apivegpont, termek, termekLista);
        break;
        case "CostListDesc":
          rendezes = "?_sort=ar&_order=desc";
          apivegpont = "http://localhost:3000/termekek";
          apivegpont += rendezes;
          myAjax.getAdat(apivegpont, termek, termekLista);
          break;
          case "NameListDesc":
            rendezes = "?_sort=nev&_order=desc";
            apivegpont = "http://localhost:3000/termekek";
            apivegpont += rendezes;
            myAjax.getAdat(apivegpont, termek, termekLista);
          break;
          case "CostListAsc":
            rendezes = "?_sort=ar&_order=asc";
            apivegpont = "http://localhost:3000/termekek";
            apivegpont += rendezes;
            myAjax.getAdat(apivegpont, termek, termekLista);

            break;
      default:
        break;
    }
  });
  function termekLista(termekek) {
    const szuloElem = $('.termekek');
    const sablonElem = $('footer .termek');
sablonElem.show();
szuloElem.empty();
    termekek.forEach(function (elem) {
      let node = sablonElem.clone().appendTo(szuloElem)
      const obj = new TermekAruhaz(node, elem)
    })
    sablonElem.hide();//sablonelem eltávolítása

    $(window).on('termekKosarba', (event) => {
      //itt hívjuk meg a kosarat és belepakoljuk a kosár tömbbe az
      //aktuális termék adatait
      kosar.setKosar(event.detail)
    })
  }
})
