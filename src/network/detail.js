export class Goods{
  constructor(iteminfo) {
    this.title=iteminfo.title
    this.desc=iteminfo.desc
    this.newPrice=iteminfo.price
    this.oldPirce=iteminfo.oldPirce
    this.discount=iteminfo.discountDesc
    this.columns=iteminfo.columns
    this.services=iteminfo.services
    this.realPrice=iteminfo.lowNowPrice
  }
}
