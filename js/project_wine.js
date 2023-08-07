// function for hamburguer menu mobile
function functionMenu() {
    var menu = document.getElementById("linksMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
//*******************************************************/


function dataBaseProduct() {
    let db;

    function loadDb() {
        const linkList = "https://api.sampleapis.com/wines/reds";

        fetch(linkList)
            .then((result) => result.json())
            .then((listWine) => {
                db = listWine;
                let listRand = loadRand(3); // Receive function and store elements according of number defined
                for (let i = 0; i < listRand.length; i++) {
                    printWine(listRand[i]);
                }
            });
    }

    // function to get a list of unique random elements
    function loadRand(qt) {
        let listReturn = []; // array to save itens from itemRandom selected
        let listIds = []; // array to save itemRandom

        for (let i = 0; i < qt; i++) {
            let itemRandom = parseInt(Math.random() * db.length);
            if (existInList(listIds, itemRandom) === true) {
                // call the function existInList and give the parameters to check repetitions
                i--; //reduce i to get the correct number of elements, even with continue the number of i increases
                continue;
            }
            listIds.push(itemRandom);
            listReturn.push(db[itemRandom]);
        }
        return listReturn;
    }
    //*******************************************************/

    // function to check if the random element is already saved in the list(listIds)
    function existInList(list, value) {
        for (let i = 0; i < list.lenght; i++) {
            if (list[i] === value) {
                return true;
            }
        }
        return false;
    }
    //*******************************************************/

    function printWine(itemWine) {
        let main = document.querySelector("main");

        // Example random object: {"winery":"Maselva","wine":"Emporda 2012","rating":{"average":"4.9","reviews":"88 ratings"},"location":"Spain\n·\nEmpordà","image":"https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_375x500.jpg","id":1}

        //container to receive products//
        let newDivContainer = document.createElement("div");
        newDivContainer.classList = "container_product";
        main.appendChild(newDivContainer);
        //****************************//

        for (let prop in itemWine) {
            let newDiv = document.createElement("div");

            if (prop == "rating") {
                // rating is one object inside the object, so one loop to get elements inside
                for (let prop in itemWine.rating) {
                    let newDiv2 = document.createElement("div");
                    newDiv2.classList = "container_rating";
                    newDiv2.textContent = `${prop}: ${itemWine.rating[prop]}`;
                    newDivContainer.appendChild(newDiv2);
                }
            } else if (prop == "image") {
                // condition to create element img and show image
                let newImage = document.createElement("img");
                newImage.classList = "container_img";
                newImage.src = itemWine.image;
                newImage.alt = "Image Wine";
                main.appendChild(newDiv);
                newDiv.appendChild(newImage);
            } else if (prop == "id") {
                //condition to create the button element below the prop id / id is display none
                let newDiv3 = document.createElement("div");
                newDiv3.classList = `${prop}`;
                newDiv3.textContent = `${prop}: ${itemWine[prop]}`;
                newDivContainer.appendChild(newDiv3);
                let buttonShop = document.createElement("button");
                buttonShop.type = "button";
                buttonShop.id = `${itemWine[prop]}`;
                buttonShop.innerHTML = "Shop Now";
                newDivContainer.appendChild(buttonShop);
            } else {
                //else bring all the others prop's
                newDiv.classList = `${prop}`;
                newDiv.textContent = `${prop}: ${itemWine[prop]}`;
            }

            newDivContainer.appendChild(newDiv);
        }
    }
    loadDb();
}

dataBaseProduct();
// dataBaseProduct();
// dataBaseProduct();


