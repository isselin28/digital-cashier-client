import base64data from "./base64.json";
export default function createPrintData(cart, total) {
  console.log("cart", cart);
  console.log("total", total);

  let result;

  const esc = "\x1B"; //ESC byte in hex notation
  const newline = "\x0A"; //LF byte in hex notation
  const space = " ";

  const init = esc + "@";
  const title = esc + "!" + "\x38" + "LOTEK KALIPAH APO";
  const address = esc + "!" + "\x00" + "JL. BATANGHARI NO.21, JAKARTA";
  // newline newline

  const maxChar = 30;
  const itemList = cart.map((item) => {
    const nameL = item.name.length;
    const priceL = String(item.price).length;
    const spaceL = maxChar - nameL - priceL;

    const spacing = space.repeat(spaceL);

    return `${item.name}${spacing}${item.price}` + newline;
  });

  console.log("itemList", itemList);

  result = itemList.join(" ");

  console.log("result", result);

  let cmds = esc + "@"; //Initializes the printer (ESC @)

  cmds += esc + "!" + "\x38"; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
  cmds += "LOTEK KALIPAH APO"; //text to print
  cmds += newline + newline;
  cmds += esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
  cmds += `COOKIES                   5.00`;
  cmds += newline;
  cmds += "MILK 65 Fl oz             3.78";
  cmds += newline + newline;
  cmds += "SUBTOTAL                  8.78";
  cmds += newline;
  cmds += "TAX 5%                    0.44";
  cmds += newline;
  cmds += "TOTAL                     9.22";
  cmds += newline;
  cmds += "CASH TEND                10.00";
  cmds += newline;
  cmds += "CASH DUE                  0.78";
  cmds += newline + newline;
  cmds += esc + "!" + "\x18"; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
  cmds += "# ITEMS SOLD 2";
  cmds += esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
  cmds += newline + newline;
  cmds += "11/03/13  19:53:17";

  console.log(cmds);

  print(result);
}

function print(data) {
  var S = "#Intent;scheme=rawbt;";
  var P = "package=ru.a402d.rawbtprinter;end;";
  var textEncoded = encodeURI(data);
  window.location.href = "intent:" + textEncoded + S + P;
}
