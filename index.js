let contacts = [];

onload = () => {
    //localStorage.clear()
    let location = window.location.href.split('/')[3];
    const contactsList = JSON.parse(localStorage.getItem('contacts'));

    if (location == 'index.html') {
        document.querySelector('#contContacts').innerHTML = contactsList.length;
    } else if (location == 'list-contacts.html') {

        if (contactsList)
            contacts = contactsList;

        showContacts();


    } else if (location == 'register-contact.html') {

        document.querySelector('#inputName').focus();
        document.querySelector('#btnSave').onclick = () => {
            saveContact();
        }
    }

};

const saveContact = () => {

    let photo = document.getElementById('photo');
    let imgData = getBase64Image(photo);
    let photoValue = imgData;

    let name = document.querySelector('#inputName').value;
    let nameValue = name;

    let relationship = document.querySelector('#inputRelationship').value;
    let relationshipValue = relationship;

    let phone = document.querySelector('#inputPhone').value;
    let phoneValue = phone;

    let email = document.querySelector('#inputEmail').value;
    let emailValue = email;

    let birthday = document.querySelector('#inputBirthday').value;
    let birthdayValue = birthday;

    let notes = document.querySelector('#inputNotes').value;
    let notesValue = notes;

    if (contacts != null) {
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    if (nameValue != '' && phoneValue != null && emailValue != null && relationshipValue != null) {
        contacts.push({
            id: Math.random().toString().replace('0.', ''),
            photo: photoValue,
            name: nameValue,
            relationship: relationshipValue,
            phone: phoneValue,
            email: emailValue,
            birthday: birthdayValue,
            notes: notesValue
        });

        document.querySelector('#photo').src = 'assets/image/Group 21.png';
        document.querySelector('#inputName').value = '';
        document.querySelector('#inputRelationship').value = '';
        document.querySelector('#inputPhone').value = '';
        document.querySelector('#inputEmail').value = '';
        document.querySelector('#inputBirthday').value = '';
        document.querySelector('#inputNotes').value = '';

        alert('Salvo com sucesso!');

        saveContacts();
    } else {
        alert('Para salvar prencha os campos obrigatórios!');
    }
}

const showContacts = () => {
    const listContacts = document.querySelector('#listContacts');
    listContacts.innerHTML = '';

    contacts.forEach((t) => {

        let elemCard = document.createElement("div");
        elemCard.classList.add('cardContacts');
        listContacts.appendChild(elemCard);

        let elemPhoto = document.createElement("img");
        elemPhoto.src = "data:image/png;base64," + t.photo;
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

        //View Contact
        let elemView = document.createElement('img');
        elemView.src = 'assets/image/eye.png'
        // elemView.classList.add('buttonCard');
        // elemView.classList.add('View');
        elemCard.appendChild(elemView);
        elemView.onclick = () => {
            activateScreen('tela2');

            document.getElementById('photo').src = "data:image/png;base64," + t.photo;

            document.querySelector("#inputPhoto").classList.add('hidden');

            document.querySelector('#inputName').value = t.name;
            document.querySelector('#inputName').disabled = true;
            document.querySelector('#inputName').classList.add('inputDisable');

            document.querySelector('#inputRelationship').value = t.relationship;
            document.querySelector('#inputRelationship').disabled = true;
            document.querySelector('#inputRelationship').classList.add('inputDisable');

            document.querySelector('#inputPhone').value = t.phone;
            document.querySelector('#inputPhone').disabled = true;
            document.querySelector('#inputPhone').classList.add('inputDisable');

            document.querySelector('#inputEmail').value = t.email;
            document.querySelector('#inputEmail').disabled = true;
            document.querySelector('#inputEmail').classList.add('inputDisable');

            document.querySelector('#inputBirthday').value = t.birthday;
            document.querySelector('#inputBirthday').disabled = true;
            document.querySelector('#inputBirthday').classList.add('inputDisable');

            document.querySelector('#inputNotes').value = t.notes;
            document.querySelector('#inputNotes').disabled = true;
            document.querySelector('#inputNotes').classList.add('inputDisable');

            document.querySelector('#btnSave').classList.add('hidden');
        }

        // //Edit Contact
        // let elemEdit = document.createElement('button');
        // elemEdit.classList.add('buttonCard');
        // elemEdit.classList.add('Edit');
        // elemCard.appendChild(elemEdit);
        // elemEdit.onclick = () => {

        //     activateScreen('tela2');

        //     document.querySelector('#inputId').value = t.id;
        //     document.getElementById('photo').src = "data:image/png;base64," + t.photo;
        //     document.querySelector('#inputName').value = t.name;
        //     document.querySelector('#inputRelationship').value = t.relationship;
        //     document.querySelector('#inputPhone').value = t.phone;
        //     document.querySelector('#inputEmail').value = t.email;
        //     document.querySelector('#inputBirthday').value = t.birthday;
        //     document.querySelector('#inputNotes').value = t.notes;
        // }

        //Delete Contact
        let elemDelete = document.createElement('img');
        elemDelete.src = 'assets/image/delete.png';
        // elemDelete.classList.add('buttonCard');
        // elemDelete.classList.add('Delete');
        elemCard.appendChild(elemDelete);
        elemDelete.onclick = () => {
            let itens = contacts.filter(item => item.id !== t.id)
            localStorage.setItem('contacts', JSON.stringify(itens));
            location.reload();
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

const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
};

const activateScreen = (comp) => {
    let screenList = document.querySelectorAll('body > .component');
    screenList.forEach((c) => c.classList.add('hidden'));
    document.querySelector('#' + comp).classList.remove('hidden');
};

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

}