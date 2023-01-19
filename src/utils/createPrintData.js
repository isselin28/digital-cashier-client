import base64data from "./base64.json";
export default function createPrintData(cart, total) {
  console.log("cart", cart);
  console.log("total", total);
  //Create ESP/POS commands for sample label
  const esc = "\x1B"; //ESC byte in hex notation
  const newLine = "\x0A"; //LF byte in hex notation

  const init = esc + "@";
  const title = esc + "!" + "\x38" + "LOTEK KALIPAH APO";
  const address = esc + "!" + "\x00" + "JL. BATANGHARI NO.21, JAKARTA";
  // newline newline

  const maxChar = 30;
  const itemList = cart.map((item) => {
    const nameL = item.name.length;
    const priceL = item.price.length;
    const totalSpace = maxChar - nameL - priceL;

    return `${item.name}                   5.00`;
  });

  let cmds = esc + "@"; //Initializes the printer (ESC @)

  cmds += esc + "!" + "\x38"; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
  cmds += "LOTEK KALIPAH APO"; //text to print
  cmds += newLine + newLine;
  cmds += esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
  cmds += "COOKIES                   5.00";
  cmds += newLine;
  cmds += "MILK 65 Fl oz             3.78";
  cmds += newLine + newLine;
  cmds += "SUBTOTAL                  8.78";
  cmds += newLine;
  cmds += "TAX 5%                    0.44";
  cmds += newLine;
  cmds += "TOTAL                     9.22";
  cmds += newLine;
  cmds += "CASH TEND                10.00";
  cmds += newLine;
  cmds += "CASH DUE                  0.78";
  cmds += newLine + newLine;
  cmds += esc + "!" + "\x18"; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
  cmds += "# ITEMS SOLD 2";
  cmds += esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
  cmds += newLine + newLine;
  cmds += "11/03/13  19:53:17";

  console.log(cmds);

  print(cmds);
}

console.log("base64data", base64data.data);

function print(data) {
  var S = "#Intent;scheme=rawbt;";
  var P = "package=ru.a402d.rawbtprinter;end;";
  const base64 = "rawbt:url:base64,aHR0cHM6Ly93d3cuYmFzZTY0ZW5jb2RlLm9yZy8=";
  var textEncoded = encodeURI(data);
  window.location.href = "intent:" + "PGRpdj5IZWxsb3chPC9kaXY+" + S + P;
}
