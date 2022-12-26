
const socket = io();

socket.on('listChange', (data) => {
    console.log(data)
    updateList(data);
})

const listContainer = document.getElementById('listContainer');

const updateList = (list) => {
    listContainer.innerHTML = '';
    list.forEach((item) => {
        const product = document.createElement('div');
        product.setAttribute('style','display: flex; gap: 20px; align-items: center;' )
        product.innerHTML = `
                        <div><a href="https://www.freeiconspng.com/img/3602" title="Image from freeiconspng.com"><img src="https://www.freeiconspng.com/uploads/edit-new-icon-22.png" width="45" alt="Edit, new, icon" /></a></div>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <p>Category:${item.category}</p>
                        <p>Price: ${item.price}</p>
                        <p>Id: ${item.id}</p>
                        <p>Code: ${item.code}</p>
                        <p>Stock:${item.stock}</p>
                    `;
        listContainer.appendChild(product);
    })
}
