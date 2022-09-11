//Basic Variables

const adoptionFee = 50;
const finalPrice = (a, b) => a + b;

// Object Constructor & Array / Array Objects

class Dog {
    constructor(name, breed, age, gender, price, personality) {
        this.name = name;
        this.breed = breed;
        this.age = parseInt(age);
        this.gender = gender;
        this.price = parseFloat(price);
        this.available = true;
        this.personality = personality;
    }
    adopted() {
        this.available = false;
    }
}

const ernie = new Dog('Ernie', 'Poodle', 1, 'Male', 100, 'Active');
const poppy = new Dog('Poppy', 'Pug', 4, 'Female', 50, 'Friendly');
const jojo = new Dog('Jojo', 'Cocker Spaniel', 3, 'Male', 100, 'Clingy');

const availableDogs = [ernie, poppy, jojo];

availableDogs.push(new Dog('Genie', 'Mixed Dog', 2, 'Female', 50, 'Glutton'));
availableDogs.push(new Dog('Coco', 'Bull Terrier', 1, 'Female', 100, 'Playful'));
availableDogs.push(new Dog('Tammy', 'Chihuahua', 5, 'Female', 100, 'Yappy'));


// Dynamically Adding Dog Cards to HTML

const cards = document.getElementById('dogCards');


for (const dog of availableDogs) {
    cards.appendChild
    cards.innerHTML +=
        `<div class="col-lg-4 col-md-6 col-sm-12" id="${dog.name}Card" id="${dog.available}>
                    <div class="card" style="width: 18rem;">
                    <img src="./images/${dog.name}.jpg" class="card-img-top" alt="Picture of adoptable ${dog.breed}.">
                    <div class="card-body">
                        <h5 class="card-title">${dog.name} | ${dog.breed}</h5>
                        <p class="card-text">${dog.age} year old, ${dog.gender}, ${dog.personality} </p>
                        <p class="card-text">Price to adopt: $${finalPrice(dog.price, 50)}</p>
                    </div>
                    </div>
                </div>`;
}

// Adopted Dog Image Generator

const adopteeBtn = document.getElementById("randomButton");
const adoptedDogImg = document.getElementById("randomDog")

function showRandomDog(message){
    document.getElementById("randomDog").innerHTML = `
    <img src="${message}" alt="Image of a previously adopted dog">
    `
}

async function fetchDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    showRandomDog(data.message);
}

adopteeBtn.addEventListener("click",fetchDog)


// Adoption Button Collapsible 

const formDisplay = document.getElementById("adoptionForm");
const adoptBtn = document.getElementById("adoptButton");

adoptBtn.addEventListener("click", showForm);

function showForm() {
    formDisplay.style.display === "none" ? formDisplay.style.display = "block" : formDisplay.style.display = "none";
}



// Form Data Storage

const submit = document.getElementById('submitBtn');
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputPhone = document.getElementById("tel");
const inputEmail = document.getElementById("email");

// Creating Dog Select Options From Array

const dogOptions = document.getElementById("dogOptions");

for (const dog of availableDogs) {
    const selectOption = document.createElement('option');
    const selectOptionText = document.createTextNode(`${dog.name}`);
    selectOption.appendChild(selectOptionText);
    dogOptions.appendChild(selectOption);


    // Submit Button Function & Adopted Card Removal

    function submitInfo() {
        localStorage.setItem('firstName', inputFirstName.value);
        localStorage.setItem('lastName', inputLastName.value);
        localStorage.setItem('phone', inputPhone.value);
        localStorage.setItem('email', inputEmail.value);

        formDisplay.style.display = "none";
        adoptBtn.style.display = "none";

        for (const dog of availableDogs) {
            const dogAdoption = dogOptions.value;

            if (dogAdoption === dog.name) {
                dog.adopted();
                document.getElementById(`${dog.name}Card`).remove();
            }
        }


        // Adoption Alert On Submit Button Click

        Swal.fire({
            title: 'Success!',
            text: 'Your adoption request has been submitted.',
            icon: 'info',
            iconColor: '#FFCECE',
            confirmButtonText: 'Confirm',
            confirmButtonColor: '#FFCECE'
        })

        let adoptionNotice = document.createElement("p");
        adoptionNotice.innerHTML = `<p>Thank you for your interest in adopting one of our dogs!</p>
                                    <p>One of our representatives will get in touch with you within the next three business days to further discuss your adoption.</p>`
        const adoptionAlert = document.getElementById("adoptionAlert");
        adoptionAlert.appendChild(adoptionNotice);
        adoptionNotice.classList.add("adoptionNotice");
    }
}

//Forget Function for OnClick

function forgetInfo() {
    localStorage.clear();
}

// Button OnClicks

const submitBtn = document.getElementById('submitBtn');
const forgetBtn = document.getElementById('forgetBtn');

submitBtn.addEventListener('click', submitInfo);
forgetBtn.addEventListener('click', forgetInfo);

// Adopted Dog Data Storage

localStorage.setItem('dogArray', JSON.stringify(availableDogs));