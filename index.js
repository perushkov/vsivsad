const container = document.getElementById("content");
const avaliableItems = []
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const node = document.createElement("div");
            avaliableItems.push(element);
            node.innerHTML = `
                <img src="img/${element.image}" alt="variety of roses" style="width:450px;height:350px;border:0;">
                <p>[${element.id}] ${element.name} ${element.price} грн./саджанець</p>
                <button type="button" onclick="onAddToBasket('${element.id}')">Купити</button>
                <select name="numb" id="select_${element.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <br>
            `;
            container.appendChild(node);
        });
    })
    .catch(error => console.error(error));

const storage = window.localStorage;

let basket = JSON.parse(storage.getItem('basket'));

if (!basket) {
    basket = {
        items: []
    }
    storage.setItem('basket', JSON.stringify(basket));
}

const onAddToBasket = id => {
    const item = avaliableItems.find(e => e.id === id);
    if (item) {
        const select = document.getElementById(`select_${item.id}`)
        basket.items.push({
            image: item.image,
            id: item.id,
            price: item.price,
            name: item.name,
            quantity: select.options[select.selectedIndex].value
        });
    }
    storage.setItem('basket', JSON.stringify(basket));
    console.log(basket);
}


