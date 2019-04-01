function fixPriceLabel(priceLabelString) {

  const extractPriceFromPriceString = priceString => priceString.split("£")[1];

  const isPriceHigherThanAllPricesAfterIt = (thisPrice, remainingPrices) => {
      return parseFloat(thisPrice) > Math.max(...remainingPrices);
  }

  const isFirstPrice = (price, listOfPrices) => price === listOfPrices[0];
  const isOnlyPrice = listOfPrices => listOfPrices.length === 1;
  const isLastPrice = (price, listOfPrices) => price === listOfPrices.slice(-1).pop();

  const formatPriceString = (price, listOfPrices) => {
      return isFirstPrice(price, listOfPrices)
          ? (isOnlyPrice(listOfPrices) ? "Now £" + price : "Was £" + price)
          : (!isLastPrice(price, listOfPrices) ? " then £" + price : " now £" + price)
  }

  return priceLabelString
      .split(",")
      .map(priceString => extractPriceFromPriceString(priceString))
      .filter((price, positionOfPriceInList, listOfPrices) => {
          return isPriceHigherThanAllPricesAfterIt(price, listOfPrices.slice(positionOfPriceInList + 1));
      })
      .map((filteredPrice, positionOfPriceInList, listOfFilteredPrices) => {
          return formatPriceString(filteredPrice, listOfFilteredPrices);
      })
      .join(",")
      ;
}

module.exports = fixPriceLabel;