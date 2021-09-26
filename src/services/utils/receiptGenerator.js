export const customerReceipt = (sales = {}, companyDetails = {}) => {
    let customerReceiptElement = document.createElement('div')
    customerReceiptElement.setAttribute("class", "receipt")
    customerReceiptElement.setAttribute("id", "receipt")

    customerReceiptElement.innerHTML = `
        <div class="header">
            <div class="logo">
                <img src="logo.png" alt="logo">
            </div>
            <div class="company-name">${companyDetails.name}</div>
            <div class="receipt-number">RECEIPT No. <b>${sales.receiptNumber}</b></div>
            <div class="date-time">${new Date().toLocaleString()}</div>
        </div>
        <div class="content">
            <table class="table">
                <thead>
                    <th>
                        <tr>
                            <td>ITEM</td>
                            <td>QTN * P</td>
                            <td>AMT.</td>
                        </tr>
                    </th>
                </thead>
                <tbody>
                    ${createTableRows(sales.cart) }
                    <tr>
                        <td><b>TAX</b></td>
                        <td></td>
                        <td>5.20</td>
                    </tr>
                    <tr>
                        <td><b>TOTAL</b></td>
                        <td></td>
                        <td>${sales.totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <div class="footer">
            <br>
            <div class="company-name">${companyDetails.name}</div>
            <div class="email">${companyDetails.email}</div>
            <div class="phone">${companyDetails.phone}</div>
            <br>
            <div class="email">TRANSACTION SUCCESSFUL</div>
            <div class="closure"><b>THANKS FOR YOUR PATRONAGE</b></div>
        </div>
    `
    document.body.appendChild(customerReceiptElement)
    printJS('app', 'html')
}
export const productReceipt = () => {}
// sales object
// Company-info
const createTableRows = (cart = []) => {
    let tableRows = document.createElement('template')
    for (let cartable of cart) {
        let tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${cartable.name}</td>
        <td>${cartable.counter + '*' + cartable.price}</td>
        <td>${cartable.counter * cartable.price}</td>
        `
        tableRows.appendChild(tr)
    }
    console.log(tableRows, 'Table Rows')
    return tableRows
}
