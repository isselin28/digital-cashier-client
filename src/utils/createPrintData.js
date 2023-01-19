const maxChar = 30; // max length of receipt
const esc = "\x1B"; //ESC byte in hex notation
const newline = "\x0A"; //LF byte in hex notation
const space = " ";
const dash = "-";
const divider = dash.repeat(maxChar) + newline;

const init = esc + "@"; //Initializes the printer (ESC @)
const initChar = esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
const single = esc + "!" + "\x18"; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
const double = esc + "!" + "\x38"; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex

function printDetails() {
  const data = {
    title: "LOTEK KALIPAH APO",
    address: "JL. BATANGHARI NO.21, JAKARTA",
    time: "",
  };

  const title = double + data.title + newline;
  const address = initChar + data.address + newline + newline;

  const allDetails = init + title + address;

  return allDetails + divider;
}

function printItemList(cart) {
  const itemList = cart.map((item) => {
    const nameL = item.name.length;
    const priceL = String(item.price).length;
    const qtyL = String(item.quantity).length;

    const firstLine = `${item.name}` + space.repeat(maxChar - nameL) + newline;
    const secondLine =
      `${item.quantity}x` +
      space.repeat(maxChar - qtyL - priceL - 1) +
      item.price +
      newline;

    return firstLine + secondLine;
  });

  const allItems = itemList.join("");

  return allItems + divider;
}

function printTotal(total) {
  const totalL = String(total).length;
  const totalLine = "Total" + space.repeat(maxChar - 5 - totalL) + total;

  return totalLine + newline + divider;
}

function printPayment(payMethod, total, cashReceived) {
  const payMethodL = payMethod.length;
  const methodLine =
    "Payment" + space.repeat(maxChar - 7 - payMethodL) + payMethod + newline;

  const cashReceivedL = String(cashReceived).length;
  const cashTendLine =
    "Cash Paid" +
    space.repeat(maxChar - 9 - cashReceivedL) +
    cashReceived +
    newline;

  const change = cashReceived - total;
  const changeL = String(change).length;
  const changeLine =
    "Change" + space.repeat(maxChar - 6 - changeL) + change + newline;

  if (payMethod === "cash" && cashReceived > 0) {
    return methodLine + cashTendLine + changeLine + divider + newline;
  }

  return methodLine + divider + newline;
}

function printFooter() {
  const footer = "Thank You !";

  return footer;
}

export default function createPrintData(cart, total, payMethod, cashReceived) {
  let result;

  const details = printDetails();
  const itemList = printItemList(cart);
  const totalResult = printTotal(total);
  const payment = printPayment(payMethod, total, cashReceived);
  const footer = printFooter();

  result =
    details +
    itemList +
    totalResult +
    payment +
    single +
    footer +
    newline +
    newline;

  console.log("result", result);

  print(result);
}

function print(data) {
  var S = "#Intent;scheme=rawbt;";
  var P = "package=ru.a402d.rawbtprinter;end;";
  var textEncoded = encodeURI(data);
  window.location.href = "intent:" + textEncoded + S + P;
}
