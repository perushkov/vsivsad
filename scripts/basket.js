const container = document.getElementById("container");
const basket = JSON.parse(window.localStorage.getItem('basket'));

const node = document.createElement("table");

let summary = 0;

Object.values(basket.items.reduce((r, a) => {
    r[a.id] = [...r[a.id] || [], a];
    return r
}, {})).map(e => {
    return { id: e[0].id, image: e[0].image, price: e[0].price, name: e[0].name, quantity: e.map(a => parseInt(a.quantity)).reduce((a, b) => a + b, 0) }
}).forEach(item => {
    node.innerHTML += `
        <tr>
            <td><label name="id">${item.id}</label></td>
            <td><img src="img/${item.image}" alt="item" type="image" id="logoimg"></td>
            <td name="name">${item.name}</td>
            <td name="quantity">${item.quantity}</td>
            <td>${item.quantity * parseFloat(item.price)} грн.</td>
        </tr>
    `;
    summary += item.quantity * item.price
});

container.appendChild(node);

document.getElementById("summary").innerHTML += summary + " грн "