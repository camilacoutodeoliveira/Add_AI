let contacts = [{
        id: '1',
        photo: 'assets/image/vegeta.png',
        name: 'Vegeta',
        relationship: 'Friend',
        phone: '9940534543',
        email: 'cah@email.com',
        birthday: '27/05/1992',
        notes: 'development'
    },
    {
        id: '1',
        photo: 'assets/image/Nath.jpg',
        name: 'Nathy',
        relationship: 'Friend',
        phone: '998805-3643',
        email: 'nathy@email.com',
        birthday: '27/05/1992',
        notes: 'finance'
    }
];

onload = () => {

    let location = window.location.href.split('/')[3];

    if (location == 'index.html') {
        document.querySelector('#contContacts').innerHTML = contacts.length;
    } else if (location == 'list-contacts.html') {

        showContacts();

    } else if (location == 'register-contact.html') {

        document.querySelector('#inputName').focus();

        document.querySelector('#btnSave').onclick = () => {
            saveContact();
        }
    }

};

const saveContact = () => {
    // let photo = document.querySelector('#inputPhoto');
    // let photoValue = photo.value;

    let name = document.querySelector('#inputName');
    let nameValue = name.value;

    let relationship = document.querySelector('#inputName');
    let relationshipValue = relationship.value;

    let phone = document.querySelector('#inputName');
    let phoneValue = phone.value;

    let email = document.querySelector('#inputName');
    let emailValue = email.value;

    let birthday = document.querySelector('#inputName');
    let birthdayValue = birthday.value;

    let notes = document.querySelector('#inputName');
    let notesValue = notes.value;

    if (nameValue != '') {
        contacts.push({
            id: Math.random.toString().replace('0.', ''),
            // photo: phoneValue,
            name: nameValue,
            relationship: relationshipValue,
            phone: phoneValue,
            email: emailValue,
            birthday: birthdayValue,
            notes: notesValue
        });

        name.value = '';
        relationship.value = '';
        phone.value = '';
        email.value = '';
        birthday.value = '';
        notes.value = '';
    }
}

const showContacts = () => {
    const listContacts = document.querySelector('#listContacts');
    listContacts.innerHTML = '';

    contacts.forEach((t) => {

        let elemCard = document.createElement("div");
        elemCard.classList.add('cardContacts');
        listContacts.appendChild(elemCard);

        let elemPhoto = document.createElement("IMG");
        elemPhoto.src = t.photo;
        elemPhoto.classList.add('imgCard');
        elemCard.appendChild(elemPhoto);

        let elemName = document.createElement('p');
        elemName.innerHTML = t.name;
        elemCard.appendChild(elemName);

        let elemRelationship = document.createElement('p');
        elemRelationship.innerHTML = t.relationship;
        elemCard.appendChild(elemRelationship);

        let elemPhone = document.createElement('p');
        elemPhone.innerHTML = t.phone;
        elemCard.appendChild(elemPhone);

        let elemEmail = document.createElement('p');
        elemEmail.innerHTML = t.email;
        elemCard.appendChild(elemEmail);

        elemCard.onclick = () => {
            //editar, visualizar e exlcuir
        }

    });


    if (contacts.length > 0) {
        listContacts.classList.remove('hidden');
        document.querySelector('#blank').classList.add('hidden');
    } else {
        listContacts.classList.add('hidden');
        document.querySelector('#blank').classList.remove('hidden');
    }
}